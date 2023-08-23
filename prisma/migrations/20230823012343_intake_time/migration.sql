/*
  Warnings:

  - Added the required column `intakeTime` to the `Record` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Record" ADD COLUMN     "intakeTime" TIMESTAMP(3) NOT NULL;
