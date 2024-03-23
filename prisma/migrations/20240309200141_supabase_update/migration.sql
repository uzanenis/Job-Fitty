/*
  Warnings:

  - You are about to drop the column `feedback` on the `candidate_scores` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "candidate_scores" DROP COLUMN "feedback",
ADD COLUMN     "response" TEXT;
