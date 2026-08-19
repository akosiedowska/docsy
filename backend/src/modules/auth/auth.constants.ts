const SECONDS_TO_MS = 1000

export const REFRESH_TOKEN_COOKIE_NAME = 'refresh_token'
export const REFRESH_TOKEN_TTL_SECONDS = 172800 // 48h sliding expiry
export const REFRESH_TOKEN_GRACE_SECONDS = 30

export const REFRESH_TOKEN_TTL_MS = REFRESH_TOKEN_TTL_SECONDS * SECONDS_TO_MS

// How long a rotated-out refresh token stays valid, so a second tab racing on the same token isn't treated as reuse/theft.
export const REFRESH_TOKEN_GRACE_MS = REFRESH_TOKEN_GRACE_SECONDS * SECONDS_TO_MS
