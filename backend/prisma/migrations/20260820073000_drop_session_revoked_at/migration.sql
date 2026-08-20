-- Logout now deletes the session row instead of soft-revoking it, so the
-- revokedAt flag is no longer needed.
ALTER TABLE "Session" DROP COLUMN "revokedAt";
