import "./lib/fetch-guard";
import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import { initPostgres } from "./server/db";
import { handleApiRequest } from "./server/api-handler";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

// Auto-initialize PostgreSQL on module load
initPostgres().catch((err) => {
  console.warn("[PostgreSQL] Init warning:", err.message);
});

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const url = new URL(request.url);
      const host = (
        request.headers.get("x-forwarded-host") ||
        request.headers.get("host") ||
        url.host
      ).toLowerCase();

      // 1. Redirect www to non-www
      if (host.startsWith("www.ichliebedeutschmedan.or.id")) {
        url.host = "ichliebedeutschmedan.or.id";
        url.protocol = "https:";
        return Response.redirect(url.toString(), 301);
      }

      // 2. Trailing slash normalization
      if (url.pathname.length > 1 && url.pathname.endsWith("/")) {
        url.pathname = url.pathname.slice(0, -1);
        return Response.redirect(url.toString(), 301);
      }

      // Intercept /api routes and process with PostgreSQL Express-ready backend handler
      const apiResponse = await handleApiRequest(request);
      if (apiResponse) {
        return apiResponse;
      }

      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      const normalized = await normalizeCatastrophicSsrResponse(response);

      // 3. Inject Link rel="canonical" header for HTML responses
      if (normalized.headers.get("content-type")?.includes("text/html")) {
        const cleanPath = url.pathname === "/" ? "/" : url.pathname.replace(/\/+$/, "");
        const newHeaders = new Headers(normalized.headers);
        newHeaders.set("Link", `<https://ichliebedeutschmedan.or.id${cleanPath}>; rel="canonical"`);
        return new Response(normalized.body, {
          status: normalized.status,
          statusText: normalized.statusText,
          headers: newHeaders,
        });
      }

      return normalized;
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
