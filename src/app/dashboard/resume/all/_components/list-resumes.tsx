"use client";

import { useEffect, useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { PdfFile } from "@prisma/client";
import { DataTable } from "@/components/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import UploadResume from "@/components/upload-resume";
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
import { deletePdfFile } from "../../actions";
import { useToast } from "@/components/ui/use-toast";

const ListResumes = ({
  userId,
  resumes,
  pageCount,
}: {
  userId: string;
  resumes: PdfFile[];
  pageCount: number;
}) => {
  const router = useRouter();
  const { toast } = useToast();

  const columns = useMemo<ColumnDef<PdfFile, unknown>[]>(
    () => [
      {
        accessorFn: (file) => file.fileName,
        header: "File Name",
      },
      {
        header: "File Url",
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
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <Dialog>
                  <DialogTrigger asChild>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                      Edit
                    </DropdownMenuItem>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <h2 className="text-3xl font-bold my-3">Update Job</h2>
                    </DialogHeader>
                    <UploadResume userId={userId} currentResume={data} />
                  </DialogContent>
                </Dialog>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                      Delete
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <h2 className="text-3xl font-bold my-3">
                        Delete This Resume
                      </h2>
                    </AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure you want to delete this resume?
                    </AlertDialogTitle>
                    <Separator />
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      from your account and remove your data from our servers.
                    </AlertDialogDescription>
                    <AlertDialogFooter>
                      <AlertDialogCancel asChild>
                        <Button variant="outline">Cancel</Button>
                      </AlertDialogCancel>
                      <AlertDialogAction asChild>
                        <Button
                          variant="destructive"
                          onClick={async () => {
                            await deletePdfFileFunction(data);
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
          );
        },
      },
    ],
    []
  );

  const deletePdfFileFunction = async (data: PdfFile) => {
    const response = await deletePdfFile(data);
    if (response.status == 200) {
      toast({
        title: "Success!",
        description: "Resume deleted successfully",
        duration: 5000,
      });
    } else {
      toast({
        title: "Error!",
        description: "Something went wrong",
        duration: 5000,
        variant: "destructive",
      });
    }
    router.refresh();
  };

  useEffect(() => {
    router.refresh();
  }, []);
  return (
    <>
      <DataTable columns={columns} data={resumes} />
    </>
  );
};

export default ListResumes;
