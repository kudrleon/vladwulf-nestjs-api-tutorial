/*
  Warnings:

  - A unique constraint covering the columns `[questionnaireSectionId,order]` on the table `questions` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "questions" ADD COLUMN     "order" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "questions_questionnaireSectionId_order_key" ON "questions"("questionnaireSectionId", "order");
