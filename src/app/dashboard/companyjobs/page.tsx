import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import ListJobsCard from "./_components/list-jobs-card";
import CreateJobCard from "./_components/create-job-card";

const CompanyJobsPage = async () => {
  const user = await getCurrentUser();
  if (!user) redirect("/auth");

  return (
    <div className="py-16">
      <section className="max-w-4xl	grid grid-cols-1 gap-8 lg:grid-cols-2">
        <ListJobsCard />
        <CreateJobCard />
      </section>
    </div>
  );
};

export default CompanyJobsPage;
