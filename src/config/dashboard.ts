import { DashoardNavProps } from "@/types";

export const dashboardConfig = {
  sidebarNav: [
    {
      title: "Upload Resume",
      href: "/dashboard/resume",
      icon: "review",
    },
    {
      title: "Interview Summary",
      href: "/dashboard/summary",
      icon: "brain",
    },
    {
      title: "Company Jobs",
      href: "/dashboard/companyjobs",
      icon: "building",
    },
    {
      title: "Upload Meeting(Soon)",
      href: "/dashboard/meeting",
      icon: "monitorPlay",
    },
    {
      title: "Statistics",
      href: "/dashboard/statistics",
      icon: "lineChart",
    },
  ] satisfies DashoardNavProps[],
};
