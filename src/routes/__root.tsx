import "../lib/fetch-guard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useLocation,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";
import { FloatingConsultation } from "../components/ui/floating-consultation";
import { CmsProvider } from "../lib/cms-store";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Ich Liebe Deutsch Medan — Lembaga Bahasa & Pendidikan Jerman" },
      {
        name: "description",
        content:
          "Ich Liebe Deutsch Medan — lembaga penyelenggara program Aupair, Ausbildung Gastronomie, dan FSJ Keperawatan ke Jerman bagi pemuda-pemudi Indonesia.",
      },
      { name: "author", content: "Ich Liebe Deutsch Medan" },
      {
        property: "og:title",
        content: "Ich Liebe Deutsch Medan — Lembaga Bahasa & Pendidikan Jerman",
      },
      {
        property: "og:description",
        content:
          "Kesempatan menimba ilmu dan berkarier di Jerman melalui program Aupair, Ausbildung, dan FSJ Keperawatan.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap",
      },
      { rel: "icon", href: "/logo.png", type: "image/png" },
      { rel: "shortcut icon", href: "/logo.png" },
      { rel: "apple-touch-icon", href: "/logo.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <head>
        <script
          id="fetch-getter-guard"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var w=typeof window!=="undefined"?window:typeof globalThis!=="undefined"?globalThis:null;if(!w)return;var f=typeof w.fetch==="function"&&w.fetch.bind?w.fetch.bind(w):w.fetch;var d=Object.getOwnPropertyDescriptor(w,"fetch");var p=Object.getPrototypeOf(w);var pd=!d&&p?Object.getOwnPropertyDescriptor(p,"fetch"):null;var patch=(d&&!d.writable&&!d.set)||(pd&&!pd.writable&&!pd.set)||(!d&&!pd);if(patch){Object.defineProperty(w,"fetch",{get:function(){return f;},set:function(v){f=v;},configurable:true,enumerable:true});}}catch(e){}})();`,
          }}
        />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const location = useLocation();
  const isHome = location.pathname === "/" || location.pathname === "";
  const isHeaderFooterHidden =
    location.pathname.startsWith("/admin") || location.pathname.startsWith("/login");

  return (
    <QueryClientProvider client={queryClient}>
      <CmsProvider>
        {!isHeaderFooterHidden && <SiteHeader />}
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <div className={isHeaderFooterHidden ? "" : isHome ? "" : "pt-20"}>
          <Outlet />
        </div>
        {!isHeaderFooterHidden && <SiteFooter />}
        {!isHeaderFooterHidden && <FloatingConsultation />}
      </CmsProvider>
    </QueryClientProvider>
  );
}
