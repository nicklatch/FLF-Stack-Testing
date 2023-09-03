import { useRouteError, isRouteErrorResponse, Link } from '@remix-run/react';

export default function FusionIndexRoute() {
  return (
    <div>
      <h2 className="route-page__headings">Index</h2>
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);

  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <div className="error-container">
        <p>Theres nothing here!</p>
        <Link to="/fusion">Back to the pits</Link>
      </div>
    );
  }
  return <div className="error-container">I did a whoopsies.</div>;
}
