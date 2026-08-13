export type LoginPayload = {
    email: string
    password: string
}

export type AuthResponse = {
    id: string
    email: string
    firstName: string
    lastName: string
    role: string
}