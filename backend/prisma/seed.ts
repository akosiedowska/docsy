import * as bcrypt from "bcrypt";
import {prisma} from "../src/db/prisma";

async function main() {
  await prisma.user.upsert({
    where: { email: "user@example.com" },
    update: {},
    create: {
      email: "user@example.com",
      firstName: "John",
      lastName: "Doe",
      passwordHash: await bcrypt.hash("password123", 12)
    }
  });

  const doctorsData = [
    { email: "dr.smith@example.com", firstName: "Alice", lastName: "Smith", specialization: "Cardiology" },
    { email: "dr.jones@example.com", firstName: "Bob", lastName: "Jones", specialization: "Dermatology" },
  ];

  for (const d of doctorsData) {
    const doctorUser = await prisma.user.upsert({
      where: { email: d.email },
      update: {},
      create: {
        email: d.email,
        firstName: d.firstName,
        lastName: d.lastName,
        passwordHash: await bcrypt.hash("password123", 12),
        role: "DOCTOR",
      },
    });

    const doctor = await prisma.doctor.upsert({
      where: { userId: doctorUser.id },
      update: {},
      create: {
        userId: doctorUser.id,
        specialization: d.specialization,
      },
    });

    const existingSlots = await prisma.slot.count({ where: { doctorId: doctor.id } });
    if (existingSlots === 0) {
      const baseDate = new Date("2026-09-01T09:00:00.000Z");
      await prisma.slot.createMany({
        data: Array.from({ length: 5 }).map((_, i) => ({
          doctorId: doctor.id,
          address: "123 Health St, Springfield",
          date: new Date(baseDate.getTime() + i * 60 * 60 * 1000),
        })),
      });
    }
  }
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