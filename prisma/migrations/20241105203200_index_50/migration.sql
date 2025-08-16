/*
  Warnings:

  - Added the required column `description` to the `Episode` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Episode" ADD COLUMN     "description" TEXT NOT NULL;
