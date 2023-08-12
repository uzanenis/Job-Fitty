import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

export async function getPdfFiles({
  take,
  skip,
  sortBy,
  order,
}: {
  take: number;
  skip: number;
  sortBy: string;
  order: "asc" | "desc" | undefined;
}) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("You must be logged in to create a pdfFile.");
  }

  return await prisma.pdfFile.findMany({
    take,
    skip,
    orderBy: {
      [sortBy]: order,
    },
    where: {
      userId: user.id,
    },
  });
}
