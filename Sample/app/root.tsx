import type { LinksFunction, V2_MetaFunction } from '@remix-run/node';
import type { PropsWithChildren } from 'react';
import {
  Links,
  isRouteErrorResponse,
  LiveReload,
  Meta,
  useRouteError,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import { cssBundleHref } from '@remix-run/css-bundle';
import styles from './tailwind.css';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles },
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
];

export const meta: V2_MetaFunction = () => {
  const description = 'Race Managment, Simplified';

  return [
    { name: 'description', content: description },
    { name: 'twitter:description', content: description },
    { title: 'FastLane Fusion' },
  ];
};

function Document({
  children,
  title = 'FastLane Fusion',
}: PropsWithChildren<{ title?: string }>) {
  return (
    <html lang='en' className='min-h-screen'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='keywords' content='Remix,racing' />
        <Meta />
        {title ? <title>{title}</title> : null}
        <Links />
      </head>
      <body className='grid place-items-center min-h-screen max-w-screen'>
        {children}
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Document>
      <Outlet />
      <ScrollRestoration />
    </Document>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);

  if (isRouteErrorResponse(error)) {
    return (
      <Document title={`${error.status} ${error.statusText}`}>
        <div className='error-container'>
          <h1>
            {error.status} {error.statusText}
          </h1>
        </div>
      </Document>
    );
  }

  const errorMessage = error instanceof Error ? error.message : 'Unknown error';
  return (
    <Document title='Uh-oh!'>
      <div className='error-container'>
        <h1>App Error</h1>
        <pre>{errorMessage}</pre>
      </div>
    </Document>
  );
}
