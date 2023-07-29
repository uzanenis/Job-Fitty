export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Ai Interview",
  description:
    "Smart Hiring Starts Here: Empower Your Decisions with AI Insights.",
  getHeaderLinks: (isLoggedIn: boolean) => {
    const items = [
      {
        title: "Home",
        href: "/",
      },
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
        href: "/dashboard",
      });
    }

    return items;
  },

  links: {
    github: "https://github.com/uzanenis",
    twitter: "https://twitter.com/uzanenis",
  },
};
