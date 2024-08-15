-- AlterTable
ALTER TABLE "questionnaireSections" ADD COLUMN     "createdBy" INTEGER;

-- AlterTable
ALTER TABLE "questions" ADD COLUMN     "createdBy" INTEGER;

-- AddForeignKey
ALTER TABLE "questionnaireSections" ADD CONSTRAINT "questionnaireSections_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
