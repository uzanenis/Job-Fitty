"use client";

import { Job } from "@prisma/client";
import { useEffect, useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { useRouter } from "next/navigation";
const ListJobs = ({ jobs, pageCount }: { jobs: Job[]; pageCount: number }) => {
  const router = useRouter();
  const columns = useMemo<ColumnDef<Job, unknown>[]>(
    () => [
      {
        accessorFn: (job) => job.title,
        header: "Title",
      },
      {
        accessorFn: (job) => job.description,
        header: "Description",
      },
      {
        accessorFn: (job) => job.experience,
        header: "Experience",
      },
      {
        accessorFn: (job) => job.position,
        header: "Position",
      },
      {
        accessorFn: (job) => job.technologies.join(", "),
        header: "Technologies",
      },
      {
        accessorFn: (job) => job.workType,
        header: "Work Type",
      },
      {
        accessorFn: (job) => new Date(job.createdAt).toLocaleDateString(),
        header: "Created At",
      },
    ],
    []
  );

  useEffect(() => {
    router.refresh();
  }, []);

  return (
    <>
      <DataTable columns={columns} data={jobs} />
    </>
  );
};

export default ListJobs;
