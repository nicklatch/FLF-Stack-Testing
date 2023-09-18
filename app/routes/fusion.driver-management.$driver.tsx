import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import {
  useLoaderData,
  Link,
  isRouteErrorResponse,
  useRouteError,
} from '@remix-run/react';
import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '~/components/ui/card';
import { findDriver } from '~/models/driver.server';

// TODO: add back link to return to _index or previous route

export const loader = async ({ params, request }: LoaderArgs) => {
  if (params.driver === undefined) {
    throw new Response('Uh oh...', { status: 404 });
  }

  const driverParams: Array<string> = params.driver.split('-');

  const driverInfo = await findDriver(driverParams.slice(2).join('-'), request);

  if (driverInfo) {
    return json(driverInfo);
  } else {
    throw new Response('No Driver Information Found', { status: 404 });
  }
};

export default function DriverDynamicRoute() {
  const { ...loaderData } = useLoaderData<typeof loader>();

  return (
    <div>
      <Link to="/fusion/driver-management">Back</Link>
      <h2 className="route-page__headings pb-4">
        {loaderData.firstName} {loaderData.lastName}
      </h2>
      <Card className="w-fit mx-auto">
        <CardContent className="flex flex-col justify-center items-center">
          <CardHeader className="text-2xl font-bold">Info</CardHeader>
          <ul>
            {Object.entries(loaderData).map((data) => (
              <li key={data[1]}>{data[1]}</li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Button type="button" className="mx-auto">
            Edit
          </Button>
        </CardFooter>
      </Card>
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
