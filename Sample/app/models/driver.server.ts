import { db } from "./db.server";
import { verifyUser } from "./user.server";

export async function getAllDrivers(request: Request) {
  const user = await verifyUser(request)

  const drivers = await db.driver.findMany({
    orderBy: { lastName: 'asc' }
  })

  return user ? drivers : null
}