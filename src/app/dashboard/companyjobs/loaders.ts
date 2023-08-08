import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

export async function getJobs({
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
    throw new Error("You must be logged in to create a job.");
  }

  return await prisma.job.findMany({
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

export async function getTotalJobs() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("You must be logged in to create a job.");
  }

  return prisma.job.count({
    where: {
      userId: user.id,
    },
  });
}
