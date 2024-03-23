export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Job Fitty",
  description:
    "Smart Hiring Starts Here: Empower Your Decisions with AI Insights.",
  getHeaderLinks: (isLoggedIn: boolean) => {
    const items = [
      {
        title: "About",
        href: "/about",
      },
      {
        title: "Contact",
        href: "/contact",
      },
      {
        title: "Pricing",
        href: "/pricing",
      },
    ];

    if (isLoggedIn) {
      items.push({
        title: "Dashboard",
        href: "/dashboard/scores",
      });
    }

    return items;
  },
  getDashboardLinks: () => {
    const items = [
      {
        title: "Resumes",
        href: "/dashboard/resumes",
      },
      {
        title: "Analyze Candidate",
        href: "/dashboard/analyze",
      },
      {
        title: "Company Jobs",
        href: "/dashboard/jobs",
      },
      {
        title: "Scores",
        href: "/dashboard/scores",
      },
      {
        title: "Statistics (Coming Soon)",
        href: "/dashboard/statistics",
      },
      {
        title: "Upload Meets(Coming Soon)",
        href: "/dashboard/meets",
      },
    ];

    return items;
  },

  links: {
    github: "https://github.com/uzanenis",
    twitter: "https://twitter.com/uzanenis",
  },
};
