import { Outlet, useLoaderData } from '@remix-run/react';
import Header from '~/components/Header';
import type { LoaderArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { verifyUser } from '~/models/user.server';
import SideNav from '~/components/SideNav';
import { Separator } from '~/components/ui/separator';

export const loader = async ({ request }: LoaderArgs) => {
  const user = await verifyUser(request);

  if (!user) {
    throw redirect('/login');
  }
  return json(user.username);
};

export default function FusionLayoutRoute() {
  const data = useLoaderData<typeof loader>();
  console.log(data);

  return (
    <>
      <Header username={data} />
      <div className='flex flex-col sm:flex-row'>
        <SideNav />
        <main className='w-full h-full bg-secondary text-secondary-foreground p-4 rounded-md'>
          <Outlet />
        </main>
      </div>
    </>
  );
}
