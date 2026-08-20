-- Drop refresh token rotation: the refresh token is now fixed for the session's
-- lifetime (no rotation, no grace-period reuse detection). Expired -> log in again.

-- DropIndex
DROP INDEX "Session_prevTokenHash_key";

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "prevTokenHash",
DROP COLUMN "rotatedAt";
