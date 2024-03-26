import { PrevButton } from "@/components/ui/buttons";
import ScoreDetail from "../_components/score-detail";
import { getCandidateScoreById } from "../loaders";
import { revalidatePath } from "next/cache";

export default async function ScoreDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const score = await getCandidateScoreById(params.slug.toString());
  revalidatePath("/dashboard/scores");

  return (
    <section className="container">
      <PrevButton url="/dashboard/scores" />
      {score ? <ScoreDetail candidateScore={score} /> : <p>Loading...</p>}
    </section>
  );
}
