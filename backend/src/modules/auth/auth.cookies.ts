import { REFRESH_TOKEN_TTL_SECONDS } from './auth.constants'

export const getRefreshCookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/auth',
  maxAge: REFRESH_TOKEN_TTL_SECONDS,
})

export const clearRefreshCookieOptions = () => ({ path: '/auth' })
