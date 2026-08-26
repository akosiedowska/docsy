export type AvailableSlot = {
  id: string
  date: string
  address: string
  doctor: {
    id: string
    specialization: string
    user: {
      firstName: string
      lastName: string
    }
  }
}
