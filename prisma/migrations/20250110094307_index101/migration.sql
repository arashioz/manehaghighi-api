/*
  Warnings:

  - You are about to drop the column `videoUrl` on the `Episode` table. All the data in the column will be lost.
  - Added the required column `videoUrl480` to the `Episode` table without a default value. This is not possible if the table is not empty.
  - Added the required column `videoUrl720` to the `Episode` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Episode" DROP COLUMN "videoUrl",
ADD COLUMN     "videoUrl480" TEXT NOT NULL,
ADD COLUMN     "videoUrl720" TEXT NOT NULL;
