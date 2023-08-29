import { Outlet, useLoaderData } from '@remix-run/react';
import Header from '~/components/ui/Header';
import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { verifyUser } from '~/models/user.server';

export const loader = async ({ request }: LoaderArgs) => {
  const user = await verifyUser(request);

  return json({ user });
};

export default function FusionLayoutRoute() {
  const data = useLoaderData<typeof loader>();

  console.log(data?.user);

  return (
    <div className='grid grid-cols-3 min-w-full min-h-full p-4'>
      <Header user={data?.user} />
      <Outlet />
    </div>
  );
}
