import type { User } from '@prisma/client';
import { createCookieSessionStorage, redirect } from '@remix-run/node';
import { db } from '~/models/db.server';
import bcrypt from 'bcryptjs';

type LoginForm = {
  password: User['passwordHash'];
  username: User['username'];
};

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error('SESSION_SECRET is missing or invalid');
}

export async function login({ username, password }: LoginForm) {
  const user = await db.user.findUnique({
    where: { username },
  });

  if (!user || !user.passwordHash) {
    return null;
  }

  const isValidUser = await bcrypt.compare(password, user.passwordHash);

  if (!isValidUser) {
    return null;
  }

  return { id: user.id, username };
}

const {
  getSession,
  commitSession,
  destroySession,
} = createCookieSessionStorage({
  cookie: {
    name: 'FLF_AUTH_SESSION',
    secure: process.env.NODE_ENV === 'production',
    secrets: [sessionSecret],
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
});

function getUserSession(request: Request) {
  return getSession(request.headers.get('Cookie'));
}

export async function getUserId(request: Request) {
  const session = await getUserSession(request);
  const userId = session.get('userId');

  if (!userId || typeof userId !== 'string') {
    return null;
  }

  return userId;
}

export async function requireUserId(
  request: Request,
  redirectTo: string = new URL(request.url).pathname
) {
  const session = await getUserSession(request);
  const userId = session.get('userId');

  if (!userId || typeof userId !== 'string') {
    const searchParams = new URLSearchParams([['redirectTo', redirectTo]]);
    throw redirect(`/login?/${searchParams}`);
  }
  return userId;
}

export async function requireAdmin(request: Request) {
  const userId = await getUserId(request);

  if (typeof userId !== 'string') {
    return null;
  }

  const isAdmin = await db.user.findUnique({
    where: { id: userId },
    select: {
      isAdmin: true,
    },
  });

  return isAdmin ? isAdmin : null;
}

export async function logout(request: Request) {
  const session = await getUserSession(request);

  return redirect('/login', {
    headers: { 'Set-Cookie': await destroySession(session) },
  });
}

export async function getUser(request: Request) {
  const userId = await getUserId(request);

  if (typeof userId !== 'string') {
    return null;
  }

  const user = await db.user.findUnique({
    select: {
      id: true,
      username: true,
    },
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw await logout(request);
  }

  return user;
}

export async function createUserSession(
  userId: User['id'],
  redirectTo: string
) {
  const session = await getSession();
  session.set('userId', userId);
  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
}
