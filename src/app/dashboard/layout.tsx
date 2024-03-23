import * as React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { dashboardConfig } from "@/config/dashboard";
import SidebarNav from "@/components/sidebar-nav";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/mode-toggle";
import { getCurrentUser } from "@/lib/session";
import { MobileDashboardNav } from "@/components/mobile-dashboard-nav";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  return (
    <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] p-0 md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
      <div className="md:hidden px-4 space-x-4 h-14 flex items-center justify-between sticky top-0 z-40 dark:bg-opacity-50 bg-background backdrop-blur-md shadow-slate-300">
        <Link href="/" className="flex items-center">
          <span>
            <Image
              src="/logo.png"
              alt="Job Fitty"
              width={28}
              height={28}
              className="object-contain rounded-full"
            />
          </span>
          <span className="font-special font-bold ml-2">{siteConfig.name}</span>
        </Link>
        <MobileDashboardNav user={user} />
      </div>
      <aside className="fixed top-4 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
        <ScrollArea className="py-6 pr-6 lg:py-8">
          <Link href="/" className="flex items-center mb-4">
            <span>
              <Image
                src="/logo.png"
                alt="Job Fitty"
                width={28}
                height={28}
                className="object-contain rounded-full"
              />
            </span>
            <span className="font-special font-bold ml-2">
              {siteConfig.name}
            </span>
          </Link>
          <Separator className="my-4" />
          <SidebarNav items={dashboardConfig.sidebarNav} />
          <div className="w-full mt-5">
            <ModeToggle />
          </div>
        </ScrollArea>
      </aside>
      <main className="flex w-full flex-col overflow-hidden pt-4">
        {children}
      </main>
    </div>
  );
}
