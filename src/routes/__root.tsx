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
      { title: "ICH LIEBE DEUTSCH MEDAN — Lembaga Bahasa & Pendidikan Jerman" },
      {
        name: "description",
        content:
          "ICH LIEBE DEUTSCH MEDAN — Lembaga Kursus Bahasa Jerman & Penyelenggara Program Ausbildung, Au Pair, dan FSJ ke Jerman terpercaya di Kota Medan.",
      },
      { name: "author", content: "ICH LIEBE DEUTSCH MEDAN" },
      {
        property: "og:title",
        content: "ICH LIEBE DEUTSCH MEDAN — Lembaga Bahasa & Pendidikan Jerman",
      },
      {
        property: "og:description",
        content:
          "Program resmi Ausbildung keperawatan/gastronomi, Au Pair, FSJ, dan kursus bahasa Jerman terpadu di Medan.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://ichliebedeutschmedan.or.id/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "google-site-verification", content: "M8aMApoMF6guhrl7e4RjHYaTm3toe1nAZf-7teM0iIg" },
      { name: "google-site-verification", content: "google4dfae9546e319b9f" },
      { name: "google-site-verification", content: "4dfae9546e319b9f" },
    ],
    links: [
      { rel: "canonical", href: "https://ichliebedeutschmedan.or.id/" },
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
        <meta name="google-site-verification" content="M8aMApoMF6guhrl7e4RjHYaTm3toe1nAZf-7teM0iIg" />
        <link rel="canonical" href="https://ichliebedeutschmedan.or.id/" id="primary-canonical" />
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

function CanonicalUrlManager() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const cleanPath = location.pathname === "/" ? "/" : location.pathname.replace(/\/+$/, "");
    const canonicalUrl = `https://ichliebedeutschmedan.or.id${cleanPath === "/" ? "/" : cleanPath}`;

    let canonicalLink = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", canonicalUrl);

    let ogUrl = document.querySelector<HTMLMetaElement>('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement("meta");
      ogUrl.setAttribute("property", "og:url");
      document.head.appendChild(ogUrl);
    }
    ogUrl.setAttribute("content", canonicalUrl);
  }, [location.pathname]);

  return null;
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
        <CanonicalUrlManager />
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
