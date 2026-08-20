-- Enforce one session row per user (logging in elsewhere now replaces/ends the previous session).
-- Clears existing session rows first since the new unique constraint would otherwise fail on any
-- user that already has more than one row; this is a one-time forced logout on dev/local data.
DELETE FROM "Session";

-- DropIndex
DROP INDEX "Session_userId_idx";

-- CreateIndex
CREATE UNIQUE INDEX "Session_userId_key" ON "Session"("userId");
