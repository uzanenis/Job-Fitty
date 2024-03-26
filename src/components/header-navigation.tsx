"use client";

import { siteConfig } from "@/config/site";
import { cn, isActiveRoute } from "@/lib/utils";
import { NavItemProps } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const HeaderNavigation = ({ items }: { items?: NavItemProps[] }) => {
  const pathname = usePathname();
  return (
    <div className="flex items-center h-full gap-5">
      <Link href="/" className="flex items-center space-x-2">
        <span>
          <Image
            src="/logo.png"
            alt="Job Fitty"
            width={28}
            height={28}
            className="object-contain rounded-full"
          />
        </span>
        <span className="font-special font-bold ">{siteConfig.name}</span>
      </Link>
      {items && items.length > 0 && (
        <nav className="items-center justify-center flex-1 h-full hidden md:flex">
          {items.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "md:text-xs lg:text-sm flex h-full items-center p-4 border-b-2 border-b-blue-500 border-opacity-0 hover:text-blue-500 border-t-2 border-t-transparent hover:bg-white hover:bg-opacity-5",
                    {
                      "cursor-not-allowed opacity-70": item.disabled,
                      "border-b-2 border-b-blue-500 border-opacity-100 text-blue-500 decoration-2 decoration-primary":
                        isActiveRoute(pathname as string, item.href),
                    }
                  )}
                >
                  {item.title}
                </Link>
              )
          )}
        </nav>
      )}
    </div>
  );
};

export default HeaderNavigation;
