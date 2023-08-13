import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import UploadResumeCard from "./_components/create-resume-card";
import ListResumesCard from "./_components/list-resumes-card";
import Heading from "@/components/heading";

const ResumePage = async () => {
  const user = await getCurrentUser();
  if (!user) redirect("/auth");

  return (
    <section>
      <Heading
        title="Resumes"
        description="List or upload resumes to analyze candidate's skills"
      />
      <div className="max-w-4xl	grid grid-cols-1 gap-8 lg:grid-cols-2 mt-4">
        <ListResumesCard />
        <UploadResumeCard userId={user?.id} />
      </div>
    </section>
  );
};

export default ResumePage;
