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

export type CreateAppointmentBody = {
  slotId: string
}

export type Appointment = {
  id: string
  conducted: boolean
  cancelled: boolean
  slot: {
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
}

export type DoctorAppointment = {
  id: string
  conducted: boolean
  cancelled: boolean
  description?: string
  slot: {
    id: string
    date: string
    address: string
  }
  patient: {
    id: string
    user: {
      firstName: string
      lastName: string
    }
  }
}

export type DoctorAppointmentsParams = {
  conducted: boolean
  sort: string
  limit?: number
}

export type AppointmentDetail = Appointment & {
  patient: DoctorAppointment['patient']
}
