/*
  Warnings:

  - You are about to alter the column `protein` on the `Record` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `calories` on the `Record` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `fats` on the `Record` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `carbs` on the `Record` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `foodSize` on the `Record` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Record" ALTER COLUMN "protein" SET DATA TYPE INTEGER,
ALTER COLUMN "calories" SET DATA TYPE INTEGER,
ALTER COLUMN "fats" SET DATA TYPE INTEGER,
ALTER COLUMN "carbs" SET DATA TYPE INTEGER,
ALTER COLUMN "foodSize" SET DATA TYPE INTEGER;
