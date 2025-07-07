-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('BLOCK', 'ONLINE', 'OFFLINE');

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "Status" "UserStatus" NOT NULL DEFAULT 'OFFLINE';
