import { DashoardNavProps } from "@/types";

export const dashboardConfig = {
  sidebarNav: [
    {
      title: "Resumes",
      href: "/dashboard/resume",
      icon: "review",
    },
    {
      title: "Analyze Candidate",
      href: "/dashboard/analyze",
      icon: "brain",
    },
    {
      title: "Company Jobs",
      href: "/dashboard/companyjobs",
      icon: "building",
    },
    {
      title: "Candidate Scores",
      href: "/dashboard/scores",
      icon: "fileDigit",
    },
    {
      title: "Statistics (Soon)",
      href: "/dashboard/statistics",
      icon: "lineChart",
    },
    {
      title: "Upload Meeting (Soon)",
      href: "/dashboard/meeting",
      icon: "monitorPlay",
    },
  ] satisfies DashoardNavProps[],
};
