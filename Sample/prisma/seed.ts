import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();


async function seed() {
  await db.user.upsert({
    where: { username: 'kody' },
    update: {
      username: "kody",
      // this is a hashed version of "twixrox"
      passwordHash:
        "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u",
    },
    create: {
      username: "kody",
      // this is a hashed version of "twixrox"
      passwordHash:
        "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u",
      userEmail: 'kody@example.com',
      isAdmin: true

    },
  });

  await Promise.all(
    getDrivers().map((driver) => {
      const data = { ...driver };
      return db.driver.create({ data });
    })
  );
}

function getDrivers() {
  return [
    {
      firstName: 'John',
      lastName: 'Doe',
      carNumber: 'ABC123',
      baseClass: 'RWD',
      driverPhone: '123-456-7891',
      driverEmail: 'john@example.com',
    },
    {
      firstName: 'Jerret',
      lastName: 'Hamilton',
      carNumber: 'X29',
      baseClass: 'FWD',
      driverPhone: '123-456-7892',
      driverEmail: 'jerret@example.com',
    },
    {
      firstName: 'Tank',
      lastName: 'Davis',
      carNumber: '440',
      baseClass: 'RWD',
      driverPhone: '123-456-7893',
      driverEmail: 'tank@example.com',
    },
    {
      firstName: 'Nick',
      lastName: 'Latcham',
      carNumber: '73',
      baseClass: 'FWD',
      driverPhone: '123-456-7894',
      driverEmail: 'nick@example.com',
    },
    {
      firstName: 'Cody',
      lastName: 'Cimfl',
      carNumber: '845',
      baseClass: 'RWD',
      driverPhone: '123-456-7895',
      driverEmail: 'cody@example.com',
    },
  ]
}

seed();