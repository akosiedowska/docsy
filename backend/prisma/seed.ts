import {randomBytes, scryptSync} from "node:crypto";
import {prisma} from "../src/db/prisma";

function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

async function main() {
  await prisma.user.create({
    data: {
      email: "user@example.com",
      firstName: "John",
      lastName: "Doe",
      passwordHash: hashPassword("password123")
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });