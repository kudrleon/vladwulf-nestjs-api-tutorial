/*
  Warnings:

  - The primary key for the `requests` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `businessOwner` to the `requests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `summary` to the `requests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `requests` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "qustionAnswers" DROP CONSTRAINT "qustionAnswers_requestId_fkey";

-- AlterTable
ALTER TABLE "qustionAnswers" ALTER COLUMN "requestId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "requests" DROP CONSTRAINT "requests_pkey",
ADD COLUMN     "businessOwner" TEXT NOT NULL,
ADD COLUMN     "summary" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "requests_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "requests_id_seq";

-- AddForeignKey
ALTER TABLE "qustionAnswers" ADD CONSTRAINT "qustionAnswers_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "requests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
