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
      {candidateScores.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-3.5rem)]">
          <p className="text-center text-lg font-semibold text-slate-500">
            No candidate scores available.
          </p>
        </div>
      ) : (
        <ListScores candidateScores={candidateScores} />
      )}
    </section>
  );
}
