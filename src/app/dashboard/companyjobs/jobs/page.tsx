import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import ListJobs from "./_components/list-jobs";
import { getJobs, getTotalJobs } from "../loaders";
import { Job } from "@prisma/client";
import { PrevButton } from "@/components/ui/buttons";
const JobsPage = async ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) => {
  const user = await getCurrentUser();
  if (!user) redirect("/auth");

  const { page, per_page, sort } = searchParams;

  // Number of records to show per page
  const take = typeof per_page === "string" ? parseInt(per_page) : 5;

  // Number of records to skip
  const skip = typeof page === "string" ? (parseInt(page) - 1) * take : 0;
  const [column, order] =
    typeof sort === "string"
      ? (sort.split(".") as [keyof Job | undefined, "asc" | "desc" | undefined])
      : [];

  const sortBy = column === "createdAt" ? "createdAt" : (column as string);

  const jobs = await getJobs({ take, skip, sortBy, order });

  const totalJobs = await getTotalJobs();
  const pageCount = totalJobs === 0 ? 1 : Math.ceil(totalJobs / take);

  return (
    <section className="max-w-4xl py-6">
      <PrevButton url="/dashboard/companyjobs" />
      <ListJobs jobs={jobs} pageCount={pageCount} />
    </section>
  );
};

export default JobsPage;
