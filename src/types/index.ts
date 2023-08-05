import { Icons } from "@/components/icons";

export interface NavItemProps {
  title: string;
  href?: string;
  disabled?: boolean;
  description?: string;
}

export interface DashoardNavProps {
  title: string;
  href?: string;
  icon?: keyof typeof Icons;
}
