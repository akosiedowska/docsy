export const appointmentsKeys = {
  availableSlots: {
    all: ['availableSlots'] as const,
    bySpecialization: (specialization?: string) => ['availableSlots', specialization] as const,
  },
  specializations: ['specializations'] as const,
}
