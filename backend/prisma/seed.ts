import * as bcrypt from "bcrypt";
import {prisma} from "../src/db/prisma";

async function main() {
  await prisma.user.create({
    data: {
      email: "user@example.com",
      firstName: "John",
      lastName: "Doe",
      passwordHash: await bcrypt.hash("password123", 12)
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