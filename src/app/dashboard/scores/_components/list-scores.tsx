"use client";

import ScoreCircular from "@/components/score-circular";
import { CandidateScore, Job } from "@prisma/client";
import Link from "next/link";

interface CandidateScoreWithJob extends CandidateScore {
  job: Job;
}

export default function ListScores({
  candidateScores,
}: {
  candidateScores: CandidateScoreWithJob[];
}) {
  return (
    <>
      <div className="grid md:grid-cols-2 gap-4 py-4">
        {candidateScores.map((score) => (
          <Link
            href={`/dashboard/scores/${score.id}`}
            key={score.id}
            className="bg-red bg-gradient-to-r from-blue-500 to-blue-400 border dark:border-gray-200 border-blue-800 hover:scale-105 transition-all flex justify-between items-center py-4 px-4 rounded shadow-md w-full text-white"
          >
            <div>
              <div className="text-xl font-semibold mb-2">
                {score.candidateName}
              </div>
              <div className="text-base font-medium mb-1">
                {score.job.title}
              </div>
              <div className="text-sm font-light">{score.job.workType}</div>
            </div>
            <div className="w-[92px] h-full">
              <ScoreCircular score={score} />
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
