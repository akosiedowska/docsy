export type AvailableSlot = {
  id: string
  date: string
  address: string
  booked: boolean
  doctor: {
    id: string
    specialization: string
    user: {
      firstName: string
      lastName: string
    }
  }
}
