/*
  Warnings:

  - You are about to drop the column `intakeTime` on the `Record` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `Record` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Record" DROP COLUMN "intakeTime",
DROP COLUMN "updateAt";
