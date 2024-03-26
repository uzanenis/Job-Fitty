"use server";
import { env } from "@/env.mjs";
import { Configuration, OpenAIApi } from "openai";
import { prisma } from "@/lib/prisma";
import { validatedCallback } from "@/lib/validatedCallback";
import { analyzeSchema } from "@/lib/validations/analyze";
import { getCurrentUser } from "@/lib/session";

const configuration = new Configuration({
  apiKey: env.NEXT_PUBLIC_OPENAI_API_KEY,
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
        id: input.pdfFile,
      },
    });

    const cleanedText = pdfFiles!.fileText
      .replace(/[^\w\s]|_/g, "")
      .replace(/\s+/g, " ");

    const cleanedJob = JSON.stringify(input.job)
      .replace(/[^\w\s]|_/g, "")
      .replace(/\s+/g, " ");

    if (env.NEXT_PUBLIC_OPENAI_API_KEY && pdfFiles) {
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
              content: `Can you produce a score in % as a string without % tag and strengths and weaknesses about the compatibility of the job candidate with the job advertisement? Lastly, can you format the response as JSON with the 3 properties names candidateScore, candidateStrength and candidateWeakness.Be sure candidateStrength and candidateWeakness are string array. You need to mention that there should be no comma after the candidateWeakness property. Please review the JSON data and use the corrected version. Give only JSON object, don't start with """json. Job candidate's resume: ${cleanedText}
              Requirements and details of the job advertisement: ${cleanedJob}`,
            },
          ],
        });

        const responseText =
          candidateScoreResponse.data.choices[0].message?.content;
        const response = JSON.parse(responseText ?? "");

        // const response = {
        //   candidateScore: "80%",
        //   candidateStrength: [
        //     "Strong experience in various Frontend technologies such as React, Nextjs, Redux, and JavaScript",
        //     "Experience in architecting component libraries and building reusable UI components",
        //     "Proficiency in REST API integration and services",
        //     "Engagement in open source projects showcases enthusiasm and continuous learning attitude",
        //   ],
        //   candidateWeakness: [
        //     "Limited experience with the specific technologies mentioned in the job advertisement like Redux Saga",
        //     "Less clarity on experience with HTML and CSS mentioned in the job requirements",
        //     "No explicit mention of experience in building RESTful APIs",
        //     "Lack of details on hands-on programming experience with CSS",
        //   ],
        // };

        if (response) {
          await prisma.candidateScore.create({
            data: {
              jobId: input.job.id!,
              userId: user.id,
              score: response.candidateScore.toString(),
              response: JSON.stringify(response),
              candidateName: pdfFiles.candidateName,
            },
          });
        }

        return { message: "candidate score created", status: 200 };
      } catch (error) {
        console.error(error);
        return { message: error, status: 500 };
      }
    }
  },
});
