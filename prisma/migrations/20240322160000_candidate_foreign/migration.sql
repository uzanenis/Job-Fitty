/*
  Warnings:

  - Made the column `userId` on table `pdf_files` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "pdf_files" DROP CONSTRAINT "pdf_files_userId_fkey";

-- AlterTable
ALTER TABLE "pdf_files" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "pdf_files" ADD CONSTRAINT "pdf_files_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
