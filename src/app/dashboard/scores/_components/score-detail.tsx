"use client";

import { Icons } from "@/components/icons";
import ScoreCircular from "@/components/score-circular";
import { Separator } from "@/components/ui/separator";
import { CandidateScore, Job } from "@prisma/client";

type CandidateScoreWithJob = CandidateScore & {
  job: Job;
};

export default function ScoreDetail({
  candidateScore,
}: {
  candidateScore: CandidateScoreWithJob;
}) {
  const response = JSON.parse(candidateScore.response ?? "");
  const { candidateScoreString, candidateStrength, candidateWeakness } =
    response;
  return (
    <>
      <h2 className="font-semibold text-2xl mb-2">
        {candidateScore.candidateName} - {candidateScore.job.title}
      </h2>
      <div className="flex items-center justify-between mb-6">
        <div className="text-lg my-2">Job Details</div>
        <div className="w-[72px] h-full block md:hidden">
          <ScoreCircular score={candidateScore} />
        </div>
      </div>
      <div className="w-full flex items-center justify-between mb-4">
        <div className="w-full max-w-fit border border-gray-400 rounded-xl px-4 py-2">
          <div className="flex flex-col gap-4 w-fit">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-lg">Title: </span>
              <p>{candidateScore.job.title}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-lg">Description: </span>
              <p>{candidateScore.job.description}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-lg">Experience: </span>
              <p>{candidateScore.job.experience}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-lg">Technologies: </span>
              <p>
                {candidateScore.job.technologies.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </p>
            </div>
          </div>
        </div>
        <div className="w-[200px] h-full hidden md:block">
          <ScoreCircular score={candidateScore} />
        </div>
      </div>

      <p>{candidateScoreString}</p>
      <br />
      <div className="grid gap-4">
        {candidateStrength.map((item: string) => (
          <div
            key={item}
            className="flex items-center flex-shrink-0 flex-grow-0 gap-2 w-full"
          >
            <Icons.badgeCheck
              size={24}
              color="#9BCF53"
              className="flex-shrink-0 flex-grow-0"
            />
            <span className="">{item}</span>
          </div>
        ))}
      </div>
      <Separator className="my-8" />
      <div className="grid gap-4">
        {candidateWeakness.map((item: string) => (
          <div key={item} className="flex items-center gap-2">
            <Icons.badgeX
              size={24}
              color="#FF204E"
              className="flex-shrink-0 flex-grow-0"
            />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </>
  );
}
