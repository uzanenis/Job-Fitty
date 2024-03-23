"use client";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

const scoreColor = (score: number) => {
  if (score < 50) {
    return "#FF204E";
  } else if (score < 70) {
    return "#F9E897";
  } else {
    return "#9BCF53";
  }
};

export default function ScoreCircular({ score }: { score: any }) {
  return (
    <CircularProgressbar
      value={Number(score.score.slice(1))}
      text={score.score}
      styles={buildStyles({
        pathColor: scoreColor(Number(score.score.slice(1))),
        textColor: scoreColor(Number(score.score.slice(1))),
        textSize: "32px",
      })}
    />
  );
}
