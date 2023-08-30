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
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='keywords' content='Remix,racing' />
        <Meta />
        {title ? <title>{title}</title> : null}
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='true'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap'
          rel='stylesheet'
        />
        <Links />
      </head>
      <body className='min-h-[100svh] sm:min-h-screen grid grid-rows-[auto_1fr] max-w-7xl pb-4 px-4 mx-auto'>
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
