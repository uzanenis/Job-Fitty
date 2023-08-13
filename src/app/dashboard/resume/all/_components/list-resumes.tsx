"use client";

import { useEffect, useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { PdfFile } from "@prisma/client";
import { DataTable } from "@/components/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";

const ListResumes = ({
  resumes,
  pageCount,
}: {
  resumes: PdfFile[];
  pageCount: number;
}) => {
  const router = useRouter();
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
          const file = row.original;
          return (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Download</DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    console.log("Edit", file);
                  }}
                >
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    []
  );
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
