-- CreateEnum
CREATE TYPE "WorkType" AS ENUM ('REMOTE', 'OFFICE');

-- CreateTable
CREATE TABLE "Job" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "experience" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "technologies" TEXT[],
    "workType" "WorkType" NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "salaryMin" INTEGER,
    "salaryMax" INTEGER,
    "educationLevel" TEXT,
    "languageRequirement" TEXT,
    "additionalInfo" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
