import { db } from './db.server';
import { getUser } from './user.server';

export async function getAllDrivers(request: Request) {
  const user = await getUser(request);

  const drivers = await db.driver.findMany({
    orderBy: { lastName: 'asc' },
  });

  return user ? drivers : null;
}
