/*
  Warnings:

  - You are about to alter the column `protein` on the `Record` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `calories` on the `Record` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `fats` on the `Record` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `carbs` on the `Record` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Record` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- AlterTable
ALTER TABLE "Record" ADD COLUMN     "size" INTEGER,
ALTER COLUMN "protein" SET DATA TYPE INTEGER,
ALTER COLUMN "calories" SET DATA TYPE INTEGER,
ALTER COLUMN "fats" SET DATA TYPE INTEGER,
ALTER COLUMN "carbs" SET DATA TYPE INTEGER;

-- DropTable
DROP TABLE "Profile";

-- CreateIndex
CREATE UNIQUE INDEX "Record_userId_key" ON "Record"("userId");
