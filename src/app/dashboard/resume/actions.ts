"use server";

import { getCurrentUser } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { safeAction } from "@/lib/actions";
import { pdfSchema } from "@/lib/validations/pdfFiles";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

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

export const editPdfFile = safeAction(pdfSchema)(async (input) => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("You must be logged in to edit a job.");
  }

  await prisma.pdfFile.update({
    where: {
      id: input.id,
    },
    data: {
      ...input,
    },
  });

  return { message: "job-edited-for-review", status: 200 };
});

export const deletePdfFile = safeAction(pdfSchema)(async (input) => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("You must be logged in to delete a job.");
  }

  await prisma.pdfFile.delete({
    where: {
      id: input.id,
    },
  });

  const supabase = createServerComponentClient({ cookies });
  const { data, error } = await supabase.storage
    .from("resumes")
    .remove([user?.id + "/" + input.fileName + ".pdf"]);

  if (error) {
    throw new Error("Error deleting file from storage");
  }

  return { message: "job-deleted-for-review", status: 200 };
});
