import { useRouteError, isRouteErrorResponse } from 'react-router';

export default function TrackconditionsLayout() {
  return (
    <div>
      <h2 className="route-page__headings">Track Conditions</h2>
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);

  if (isRouteErrorResponse(error)) {
    if (error.status === 400) {
      return (
        <div className="error-container">
          What you're trying to do is not allowed.
        </div>
      );
    }
    if (error.status === 401) {
      return (
        <div className="error-container">
          Sorry, but you're unauthorized. Please contact your administrator for
          assistance.
        </div>
      );
    }
    if (error.status === 404) {
      return (
        <div className="error-container">
          Uh Oh..We seem to be having some technical difficulties
        </div>
      );
    }
  }

  return (
    <div className="error-container">There was an error while loading.</div>
  );
}
