"use server";
import { env } from "@/env.mjs";
import { Configuration, OpenAIApi } from "openai";
import { prisma } from "@/lib/prisma";
import { validatedCallback } from "@/lib/validatedCallback";
import { analyzeSchema } from "@/lib/validations/analyze";
import { getCurrentUser } from "@/lib/session";

const configuration = new Configuration({
  apiKey: env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const createJobCandidateScore = validatedCallback({
  inputValidation: analyzeSchema,

  callback: async (input) => {
    const user = await getCurrentUser();

    if (!user) {
      throw new Error("User not found");
    }

    //get pdf file text from db and send it to openai
    const pdfFiles = await prisma.pdfFile.findFirst({
      where: {
        id: input.pdfFiles[0],
      },
    });

    if (env.OPENAI_API_KEY && pdfFiles) {
      try {
        const candidateScoreResponse = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          max_tokens: 2000,
          messages: [
            {
              role: "system",
              content: "You are a candidate analyzer bot.",
            },
            {
              role: "user",
              content: `Can you produce a score in % of positive, negative outputs and feedbacks about the compatibility of the job candidate with the job advertisement? Lastly, can you format the response as JSON with the 2 properties names candidateScore and candidateFeedback. Job candidate's resume: ${
                pdfFiles!.fileText
              }
              Requirements and details of the job advertisement: ${JSON.stringify(
                input.job
              )}`,
            },
          ],
        });

        const responseText =
          candidateScoreResponse.data.choices[0].message?.content;
        const response = JSON.parse(responseText ?? "");
        console.log("response", response);

        return { message: "candidate score created", status: 200 };
      } catch (error) {
        console.error(error);
      }
    }
  },
});
