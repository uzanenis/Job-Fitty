-- CreateTable
CREATE TABLE "PdfFile" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fileName" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "PdfFile_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PdfFile" ADD CONSTRAINT "PdfFile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
