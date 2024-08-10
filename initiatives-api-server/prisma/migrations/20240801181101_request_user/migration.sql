/*
  Warnings:

  - Added the required column `userId` to the `qustionAnswers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `requests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "qustionAnswers" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "requests" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "requests" ADD CONSTRAINT "requests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qustionAnswers" ADD CONSTRAINT "qustionAnswers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
