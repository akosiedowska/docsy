import * as bcrypt from "bcrypt";
import {prisma} from "../src/db/prisma";

const ADDRESS = "123 Health St, Springfield";
const SLOT_HOURS_UTC = [9, 10, 11, 13, 14];
// Weekdays: past week (19-23 Oct) + next two weeks (26 Oct - 6 Nov)
const SLOT_DAYS = [
  "2026-10-19", "2026-10-20", "2026-10-21", "2026-10-22", "2026-10-23",
  "2026-10-26", "2026-10-27", "2026-10-28", "2026-10-29", "2026-10-30",
  "2026-11-02", "2026-11-03", "2026-11-04", "2026-11-05", "2026-11-06",
];

const slotDate = (day: string, hour: number) =>
  new Date(`${day}T${String(hour).padStart(2, "0")}:00:00.000Z`);

// Appointments seeded only for dr.smith: [day, hour, state]
const smithAppointments: [string, number, "conducted" | "booked" | "cancelled"][] = [
  ["2026-10-19", 9, "conducted"],
  ["2026-10-19", 10, "conducted"],
  ["2026-10-20", 11, "conducted"],
  ["2026-10-21", 9, "cancelled"],
  ["2026-10-21", 13, "conducted"],
  ["2026-10-22", 10, "conducted"],
  ["2026-10-23", 9, "conducted"],
  ["2026-10-23", 14, "booked"],
  ["2026-10-26", 9, "booked"],
  ["2026-10-26", 10, "booked"],
  ["2026-10-27", 11, "booked"],
  ["2026-10-27", 13, "cancelled"],
  ["2026-10-28", 9, "booked"],
  ["2026-10-29", 14, "booked"],
  ["2026-10-30", 10, "booked"],
  ["2026-11-02", 9, "booked"],
  ["2026-11-03", 11, "booked"],
];

async function main() {
  const userHash = await bcrypt.hash("password123", 12);

  await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      firstName: "Admin",
      lastName: "Docsy",
      passwordHash: await bcrypt.hash("admin123", 12),
      role: "ADMIN",
    },
  });

  const patientsData = [
    { email: "user@example.com", firstName: "John", lastName: "Doe" },
    { email: "anna.kowalska@example.com", firstName: "Anna", lastName: "Kowalska" },
    { email: "tom.wilson@example.com", firstName: "Tom", lastName: "Wilson" },
    { email: "maria.garcia@example.com", firstName: "Maria", lastName: "Garcia" },
    { email: "peter.novak@example.com", firstName: "Peter", lastName: "Novak" },
    { email: "sara.miller@example.com", firstName: "Sara", lastName: "Miller" },
    { email: "luke.evans@example.com", firstName: "Luke", lastName: "Evans" },
  ];

  const patients = [];
  for (const p of patientsData) {
    const patientUser = await prisma.user.upsert({
      where: { email: p.email },
      update: {},
      create: { ...p, passwordHash: userHash },
    });
    patients.push(
      await prisma.patient.upsert({
        where: { userId: patientUser.id },
        update: {},
        create: { userId: patientUser.id },
      }),
    );
  }

  const doctorsData = [
    { email: "dr.smith@example.com", firstName: "Alice", lastName: "Smith", specialization: "Cardiology" },
    { email: "dr.jones@example.com", firstName: "Bob", lastName: "Jones", specialization: "Dermatology" },
    { email: "dr.nowak@example.com", firstName: "Carla", lastName: "Nowak", specialization: "Neurology" },
    { email: "dr.lee@example.com", firstName: "David", lastName: "Lee", specialization: "Pediatrics" },
    { email: "dr.brown@example.com", firstName: "Emma", lastName: "Brown", specialization: "Orthopedics" },
  ];

  for (const d of doctorsData) {
    const doctorUser = await prisma.user.upsert({
      where: { email: d.email },
      update: {},
      create: {
        email: d.email,
        firstName: d.firstName,
        lastName: d.lastName,
        passwordHash: userHash,
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

    const existing = await prisma.slot.findMany({
      where: { doctorId: doctor.id },
      select: { date: true },
    });
    const existingTimes = new Set(existing.map((s) => s.date.getTime()));
    const newSlots = SLOT_DAYS.flatMap((day) =>
      SLOT_HOURS_UTC.map((hour) => slotDate(day, hour)),
    )
      .filter((date) => !existingTimes.has(date.getTime()))
      .map((date) => ({ doctorId: doctor.id, address: ADDRESS, date }));
    if (newSlots.length > 0) {
      await prisma.slot.createMany({ data: newSlots });
    }

    if (d.email !== "dr.smith@example.com") continue;

    for (const [i, [day, hour, state]] of smithAppointments.entries()) {
      const slot = await prisma.slot.findFirst({
        where: { doctorId: doctor.id, date: slotDate(day, hour) },
      });
      if (!slot) continue;

      const hasAppointment = await prisma.appointment.count({ where: { slotId: slot.id } });
      if (hasAppointment > 0) continue;

      await prisma.appointment.create({
        data: {
          slotId: slot.id,
          patientId: patients[i % patients.length].id,
          conducted: state === "conducted",
          cancelled: state === "cancelled",
        },
      });
      await prisma.slot.update({
        where: { id: slot.id },
        data: { booked: state !== "cancelled" },
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
