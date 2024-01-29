/*
  Warnings:

  - Changed the type of `intakeDate` on the `Record` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Record" ADD COLUMN     "updateAt" TIMESTAMP(3),
DROP COLUMN "intakeDate",
ADD COLUMN     "intakeDate" TIMESTAMP(3) NOT NULL;
