"use server";

import { getCurrentUser } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { safeAction } from "@/lib/actions";
import { pdfSchema } from "@/lib/validations/pdfFiles";

export const createPdfFile = safeAction(pdfSchema)(async (input) => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("You must be logged in to create a job.");
  }

  await prisma.pdfFile.create({
    data: {
      userId: user?.id,
      ...input,
    },
  });
});
