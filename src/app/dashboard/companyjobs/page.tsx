import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import ListJobsCard from "./_components/list-jobs-card";
import CreateJobCard from "./_components/create-job-card";
import Heading from "@/components/heading";

const CompanyJobsPage = async () => {
  const user = await getCurrentUser();
  if (!user) redirect("/auth");

  return (
    <section>
      <Heading
        title="Company Jobs"
        description="You can create a job post or list your created job posts"
      />
      <div className="max-w-4xl	grid grid-cols-1 gap-8 lg:grid-cols-2 mt-4">
        <ListJobsCard />
        <CreateJobCard />
      </div>
    </section>
  );
};

export default CompanyJobsPage;
