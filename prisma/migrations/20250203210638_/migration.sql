-- CreateEnum
CREATE TYPE "Subrole" AS ENUM ('EXECUTIVE', 'ANALYST', 'AUDITOR', 'ADMIN');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "subrole" "Subrole" NOT NULL DEFAULT 'EXECUTIVE';
