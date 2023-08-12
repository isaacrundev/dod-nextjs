/*
  Warnings:

  - You are about to drop the column `fat` on the `Record` table. All the data in the column will be lost.
  - Added the required column `fats` to the `Record` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Record" DROP COLUMN "fat",
ADD COLUMN     "fats" DOUBLE PRECISION NOT NULL;
