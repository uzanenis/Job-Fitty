"use client";

import { cn } from "@/lib/utils";
import { DashoardNavProps } from "@/types";
import Link from "next/link";
import { Icons } from "./icons";

const SidebarNav = ({ items }: { items: DashoardNavProps[] }) => {
  if (!items?.length) return null;

  return (
    <div className="flex flex-col h-full gap-2">
      {items?.map((item, index) => {
        const Icon = Icons[item.icon ?? "chevronLeft"];
        return item.href ? (
          <Link key={index} href={item.href}>
            <div
              className={cn(
                "group flex w-full items-center rounded border border-transparent px-2 py-1 hover:bg-muted hover:text-foreground"
              )}
            >
              <span>
                <Icon
                  className="mr-2 w-4 h-4"
                  aria-hidden="true"
                  width={16}
                  height={16}
                />
              </span>
              <span>{item.title}</span>
            </div>
          </Link>
        ) : (
          <span
            key={index}
            className="flex w-full cursor-not-allowed items-center rounded-md p-2 text-muted-foreground hover:underline"
          >
            {item.title}
          </span>
        );
      })}
    </div>
  );
};

export default SidebarNav;
