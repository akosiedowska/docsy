import { isAxiosError } from 'axios'

const FALLBACK_MESSAGE = 'Something went wrong. Please try again.'

export const getApiErrorMessage = (error: unknown): string => {
  if (!isAxiosError<{ message?: string }>(error)) return FALLBACK_MESSAGE
  return error.response?.data?.message ?? FALLBACK_MESSAGE
}
