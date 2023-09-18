import type { LoaderArgs, ActionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { requireAdmin } from '~/models/user.server';

// TODO: Build user creation form

export const loader = async ({ request }: LoaderArgs) => {
  const isAdmin = requireAdmin(request);

  if (!isAdmin) {
    throw new Response('Unauthorized', { status: 401 });
  }

  return json({});
};

export const action = async ({ request }: ActionArgs) => {
  // do stuff for add, edit, and delete user
};

export default function UserManagementRoute() {
  return (
    <div>
      <h2>User Management</h2>
    </div>
  );
}
