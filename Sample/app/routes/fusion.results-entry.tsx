import { useLoaderData } from "@remix-run/react";

export default function ResultsEntryRoute() {
  const loaderData = useLoaderData<typeof loader>()
  return (
    <div>
      <h2 className='route-page__headings'>Results Entry</h2>
    </div>
  );
}
