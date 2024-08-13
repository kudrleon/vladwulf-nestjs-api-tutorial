-- DropForeignKey
ALTER TABLE "requests" DROP CONSTRAINT "requests_questionnaireId_fkey";

-- AlterTable
ALTER TABLE "requests" ALTER COLUMN "questionnaireId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "requests" ADD CONSTRAINT "requests_questionnaireId_fkey" FOREIGN KEY ("questionnaireId") REFERENCES "questionnaires"("id") ON DELETE SET NULL ON UPDATE CASCADE;
