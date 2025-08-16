/*
  Warnings:

  - A unique constraint covering the columns `[enTitle]` on the table `Article` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[enTitle]` on the table `Course` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Article_enTitle_key" ON "Article"("enTitle");

-- CreateIndex
CREATE UNIQUE INDEX "Course_enTitle_key" ON "Course"("enTitle");
