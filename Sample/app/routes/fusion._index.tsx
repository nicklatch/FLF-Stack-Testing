import { useRouteError, isRouteErrorResponse } from "@remix-run/react";
import { Link } from "lucide-react";

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
        <p>Theres nothing here!.</p>
        <Link to="new">Return to </Link>
      </div>
    );
  }
  return <div className="error-container">I did a whoopsies.</div>;
}
