-- AlterTable
ALTER TABLE "questions" ALTER COLUMN "order" DROP DEFAULT;
DROP SEQUENCE "questions_order_seq";
