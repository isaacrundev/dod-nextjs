/*
  Warnings:

  - You are about to drop the column `carb` on the `Record` table. All the data in the column will be lost.
  - Added the required column `carbs` to the `Record` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Record" DROP COLUMN "carb",
ADD COLUMN     "carbs" DOUBLE PRECISION NOT NULL;
