import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/session";
import { PdfFile } from "@prisma/client";
import { redirect } from "next/navigation";
import { getPdfFiles, getTotalPdfFiles } from "./loaders";
import { PrevButton } from "@/components/ui/buttons";
import ListResumes from "./_components/list-resumes";

const ResumeAllPage = async ({
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
  const take = typeof per_page === "string" ? parseInt(per_page) : 10;
  const skip = typeof page === "string" ? (parseInt(page) - 1) * take : 0;
  const [column, order] =
    typeof sort === "string"
      ? (sort.split(".") as [
          keyof PdfFile | undefined,
          "asc" | "desc" | undefined
        ])
      : [];
  const sortBy = column === "createdAt" ? "createdAt" : (column as string);

  const resumes = await getPdfFiles({ take, skip, sortBy, order });

  const totalResumes = await getTotalPdfFiles();
  const pageCount = totalResumes === 0 ? 1 : Math.ceil(totalResumes / take);
  revalidatePath("/dashboard/resume/all");

  return (
    <section className="max-w-4xl py-6">
      <PrevButton url="/dashboard/resume" />
      <ListResumes resumes={resumes} pageCount={pageCount} />
    </section>
  );
};

export default ResumeAllPage;
