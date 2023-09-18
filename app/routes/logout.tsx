import type { ActionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { logout } from '~/models/user.server';

export const action = async ({ request }: ActionArgs) => {
  throw await logout(request);
};

export const loader = async () => redirect('/');
