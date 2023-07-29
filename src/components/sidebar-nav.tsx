"use client";

import { cn } from "@/lib/utils";
import { DashoardNavProps } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SidebarNav = ({ items }: { items: DashoardNavProps[] }) => {
  const pathname = usePathname();

  if (!items?.length) return null;

  return (
    <div className="flex flex-col h-full gap-2">
      {items?.map((item, index) => {
        return item.href ? (
          <Link key={index} href={item.href}>
            <div
              className={cn(
                "group flex w-full items-center rounded border border-transparent px-2 py-1 hover:bg-muted hover:text-foreground"
              )}
            >
              <span>Icon</span>
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
