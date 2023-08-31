import { type V2_MetaFunction, type ActionArgs, redirect } from '@remix-run/node';
import { verifyUser } from '~/models/user.server';
import { Link } from '@remix-run/react';

export const meta: V2_MetaFunction = () => {
  return [{ title: 'Remix Testing' }];
};

export const action = async ({ request }: ActionArgs) => {
  const isLoggedInAndValid = await verifyUser(request);

  if (!isLoggedInAndValid) {
    throw Error('error')
  }

  throw redirect('/fusion')
};

export default function Index() {
  return (
    <main>
      <h1 className='route-page__headings'>Welcome to FastLane Fusion</h1>
      <div className='w-full mx-auto text-center'>
        <Link to='/login'>Login</Link>
      </div>
    </main>
  );
}
