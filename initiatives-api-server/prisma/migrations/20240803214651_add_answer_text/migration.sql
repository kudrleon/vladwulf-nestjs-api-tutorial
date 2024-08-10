/*
  Warnings:

  - Added the required column `answer` to the `qustionAnswers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "qustionAnswers" ADD COLUMN     "answer" TEXT NOT NULL;
