/*
  Warnings:

  - Added the required column `candidateName` to the `pdf_files` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pdf_files" ADD COLUMN     "candidateName" TEXT NOT NULL;
