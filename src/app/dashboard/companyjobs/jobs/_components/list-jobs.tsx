"use client";

import { useMemo } from "react";
import { Job } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Dialog } from "@radix-ui/react-dialog";
import {
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateJobForm from "../../_components/create-job-form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";
import { deleteJob } from "../../_components/actions";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
        accessorKey: "createdAt",
        accessorFn: (file) => new Date(file.createdAt),
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Created At
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const data = row.original;
          return (
            <Dialog>
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DialogTrigger asChild>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                      Edit
                    </DropdownMenuItem>
                  </DialogTrigger>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        Delete
                      </DropdownMenuItem>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <h2 className="text-3xl font-bold my-3">
                          Delete This Job
                        </h2>
                      </AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you sure you want to delete this job?
                      </AlertDialogTitle>
                      <Separator />
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete from your account and remove your data from our
                        servers.
                      </AlertDialogDescription>
                      <AlertDialogFooter>
                        <AlertDialogCancel asChild>
                          <Button variant="outline">Cancel</Button>
                        </AlertDialogCancel>
                        <AlertDialogAction asChild>
                          <Button
                            variant="destructive"
                            onClick={async () => {
                              await deleteJob(data.id);
                              router.refresh();
                            }}
                          >
                            Delete
                          </Button>
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </DropdownMenuContent>
              </DropdownMenu>
              <DialogContent>
                <DialogHeader>
                  <h2 className="text-3xl font-bold my-3">Update Job</h2>
                </DialogHeader>
                <CreateJobForm job={data} />
              </DialogContent>
            </Dialog>
          );
        },
      },
    ],
    []
  );

  return (
    <>
      <DataTable columns={columns} data={jobs} />
    </>
  );
};

export default ListJobs;
