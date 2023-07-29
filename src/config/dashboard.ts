import { DashoardNavProps } from "@/types";

export const dashboardConfig = {
  sidebarNav: [
    {
      title: "Upload Resume",
      href: "/dashboard/resume",
      //icon: "raceCar",
    },
    {
      title: "View Interview Summary",
      href: "/dashboard/summary",
      //icon: "snippet",
    },
    {
      title: "Company Jobs",
      href: "/dashboard/companyjobs",
      //icon: "keyboard",
    },
    {
      title: "Upload Meeting(Soon)",
      href: "/dashboard/meeting",
      //icon: "darts",
    },
    {
      title: "Statistics",
      href: "/dashboard/statistics",
      //icon: "crown",
    },
  ] satisfies DashoardNavProps[],
};
