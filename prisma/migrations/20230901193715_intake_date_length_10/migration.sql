/*
  Warnings:

  - You are about to alter the column `intakeDate` on the `Record` table. The data in that column could be lost. The data in that column will be cast from `VarChar(11)` to `VarChar(10)`.

*/
-- AlterTable
ALTER TABLE "Record" ALTER COLUMN "intakeDate" SET DATA TYPE VARCHAR(10);
