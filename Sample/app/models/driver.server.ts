import { db } from './db.server';
import { getUser } from './user.server';

export async function getAllDrivers(request: Request) {
  const user = await getUser(request);

  const drivers = await db.driver.findMany({
    orderBy: { lastName: 'asc' },
  });

  return user ? drivers : null;
}

export async function findDriver(driverId: string, request: Request) {
  const user = await getUser(request);

  if (!user) {
    return null;
  }

  const driver = await db.driver.findUnique({
    where: { id: driverId },
  });

  return driver;
}
