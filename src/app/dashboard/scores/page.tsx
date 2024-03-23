import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { getCandidateScores } from "./loaders";
import ListScores from "./_components/list-scores";

export default async function ScoresPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/auth");

  const candidateScores = await getCandidateScores();

  return (
    <section>
      <ListScores candidateScores={candidateScores} />
    </section>
  );
}
