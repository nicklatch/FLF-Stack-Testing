import type { LinksFunction, V2_MetaFunction } from "@remix-run/node";
import type { PropsWithChildren } from "react";
import {
  Links,
  isRouteErrorResponse,
  LiveReload,
  Meta,
  useRouteError,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { cssBundleHref } from "@remix-run/css-bundle";
import styles from "./tailwind.css";
import Providers from "./components/providers";
import { useAtomValue } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap",
    rel: "stylesheet",
  },
  { rel: "stylesheet", href: styles },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const meta: V2_MetaFunction = () => {
  const description = "Race Managment, Simplified";

  return [
    { name: "description", content: description },
    { name: "twitter:description", content: description },
    { title: "FastLane Fusion" },
  ];
};

/**
 * TODO: change to atomWithStorage - has related at 'header/index.html' route
 * ? should this be using a hydrated atom ?
 * */
export const themeAtom = atomWithStorage("theme", "dark");

function Document({
  children,
  title = "FastLane Fusion",
}: PropsWithChildren<{ title?: string }>) {
  const appTheme = useAtomValue(themeAtom);

  return (
    <html lang="en" className={appTheme}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="Remix,racing" />
        <Meta />
        {title ? <title>{title}</title> : null}
        <Links />
      </head>
      <body className="max-w-screen mx-auto grid min-h-[100svh] grid-rows-[auto_1fr] px-2 sm:min-h-screen sm:max-w-7xl">
        {children}
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Providers>
      <Document>
        <Outlet />
        <ScrollRestoration />
      </Document>
    </Providers>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);

  if (isRouteErrorResponse(error)) {
    return (
      <Document title={`${error.status} ${error.statusText}`}>
        <div className="error-container">
          <h1>
            {error.status} {error.statusText}
          </h1>
        </div>
      </Document>
    );
  }

  const errorMessage = error instanceof Error ? error.message : "Unknown error";
  return (
    <Document title="Uh-oh!">
      <div className="error-container">
        <h1>App Error</h1>
        <pre>{errorMessage}</pre>
      </div>
    </Document>
  );
}
