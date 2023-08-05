"use server";

import { safeAction } from "@/lib/actions";
import { getCurrentUser } from "@/lib/session";
import { jobSchema } from "@/lib/validations/jobs";
import { Configuration, OpenAIApi } from "openai";
import { prisma } from "@/lib/prisma";
import { env } from "@/env.mjs";

const configuration = new Configuration({
  apiKey: env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const createJob = safeAction(jobSchema)(async (input) => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("You must be logged in to create a job.");
  }

  await prisma.job.create({
    data: {
      userId: user?.id,
      ...input,
    },
  });

  return { message: "job-created-for-review", status: 200 };
});
