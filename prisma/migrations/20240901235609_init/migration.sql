/*
  Warnings:

  - Added the required column `doubleBed` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `singleBed` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "doubleBed" INTEGER NOT NULL,
ADD COLUMN     "singleBed" INTEGER NOT NULL;
