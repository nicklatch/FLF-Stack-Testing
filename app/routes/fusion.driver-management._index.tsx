import type { LoaderArgs } from '@remix-run/node';
import { getAllDrivers } from '~/models/driver.server';
import { json } from '@remix-run/node';
import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from '@remix-run/react';
import { DataTable } from '~/components/ui/DataTable';
import { columns } from '~/components/ui/DataTable/columns';

export const loader = async ({ request }: LoaderArgs) => {
  // TODO: see what data you need and then add a select prop to the db call
  const drivers = await getAllDrivers(request);

  return json({ drivers });
};

export default function DriverManagementRoute() {
  const loaderData = useLoaderData<typeof loader>();
  const drivers = loaderData.drivers as Array<any>;

  return (
    <div className="space-y-6">
      <h2 className="route-page__headings">Driver Management</h2>
      <DataTable columns={columns} data={drivers} />
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
      return <div className="error-container">Driver Not Found</div>;
    }
  }

  return (
    <div className="error-container">There was an error while loading.</div>
  );
}
