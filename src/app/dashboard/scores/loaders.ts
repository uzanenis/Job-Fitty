import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

export async function getCandidateScores() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("You must be logged in to view scores.");
  }

  return await prisma.candidateScore.findMany({
    where: {
      userId: user.id,
    },
    include: {
      job: true,
    },
  });
}

export async function getCandidateScoreById(id: string) {
  return await prisma.candidateScore.findFirst({
    where: {
      id,
    },
    include: {
      job: true,
    },
  });
}

export async function getJob(id: string) {
  return await prisma.job.findFirst({
    where: {
      id,
    },
  });
}
