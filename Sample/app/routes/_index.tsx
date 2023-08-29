import type { V2_MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';

export const meta: V2_MetaFunction = () => {
  return [{ title: 'Remix Testing' }];
};

export default function Index() {
  return (
    <main>
      <h1>Welcome to FastLane Fusion</h1>
      <Link to='/login'>Login</Link>
    </main>
  );
}
