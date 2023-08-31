import { Outlet, useLoaderData, useLocation } from '@remix-run/react';
import Header from '~/components/Header';
import type { LoaderArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { verifyUser } from '~/models/user.server';
import SideNav from '~/components/SideNav';
import { useEffect } from 'react';
import { cn } from '~/lib/utils';
import { atom, useAtom } from 'jotai';

export const overview = atom(false);

export const loader = async ({ request }: LoaderArgs) => {
  const user = await verifyUser(request);

  if (!user) {
    throw redirect('/login');
  }
  return json({ username: user.username });
};

export default function FusionLayoutRoute() {
  const data = useLoaderData<typeof loader>();
  const location = useLocation().pathname;
  const [isOverview, setIsOverview] = useAtom(overview);

  useEffect(() => {
    setIsOverview(location.includes('overview'));
  }, [location, setIsOverview]);

  const radiusTweak = isOverview ? 'rounded-tl-none' : '';

  return (
    <>
      <Header username={data.username} />
      <div className='flex flex-col sm:flex-row px-4 pb-6'>
        <SideNav displayProp='hidden sm:flex' />
        <main
          className={cn(
            'w-full h-full p-4 rounded-md border radius-[var(--radius)]',
            radiusTweak
          )}
        >
          <Outlet />
        </main>
      </div>
    </>
  );
}
