import { PrevButton } from "@/components/ui/buttons";
import ScoreDetail from "../_components/score-detail";
import { getCandidateScoreById } from "../loaders";

export default async function ScoreDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const score = await getCandidateScoreById(params.slug.toString());
  console.log("score", score);

  return (
    <section className="container">
      <PrevButton url="/dashboard/scores" />
      {score ? <ScoreDetail candidateScore={score} /> : <p>Loading...</p>}
    </section>
  );
}
