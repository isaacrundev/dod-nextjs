/*
  Warnings:

  - You are about to alter the column `intakeDate` on the `Record` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(11)`.

*/
-- AlterTable
ALTER TABLE "Record" ALTER COLUMN "intakeDate" SET DATA TYPE VARCHAR(11);
