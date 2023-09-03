import { useRouteError, isRouteErrorResponse } from 'react-router';
import { Link } from '@remix-run/react';

export default function FusionDynamicRoute() {
  return (
    <>
      <span>Theres nothing here!</span>
      <Link to="/fusion">Head back to the pits</Link>
    </>
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
