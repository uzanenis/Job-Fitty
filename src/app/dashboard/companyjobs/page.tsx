import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import CreateJobForm from "./_components/create-job-form";

const CompanyJobsPage = async () => {
  const user = await getCurrentUser();
  if (!user) redirect("/auth");

  return (
    <div className="py-16">
      <section className="max-w-xl mx-auto">
        <CreateJobForm />
      </section>
    </div>
  );
};

export default CompanyJobsPage;
