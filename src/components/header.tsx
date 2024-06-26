import { getCurrentUser } from "@/lib/session";
import HeaderNavigation from "./header-navigation";
import { siteConfig } from "@/config/site";
import { ModeToggle } from "./mode-toggle";
import { LoginButton, LogoutButton } from "./ui/buttons";
import { MobileNav } from "./mobile-nav";

const Header = async () => {
  const user = await getCurrentUser();

  return (
    <header className="sticky top-0 z-40 dark:bg-opacity-50 bg-background/10 backdrop-blur-md shadow-slate-300">
      <div className="flex items-center justify-center w-full px-4 space-x-4 lg:container h-14 sm:space-x-0">
        <div className="flex-1 h-full">
          <HeaderNavigation items={siteConfig.getHeaderLinks(!!user)} />
        </div>
        <MobileNav user={user} />
        <nav className="items-center hidden h-full space-x-2 md:flex">
          <ModeToggle />
          {user ? <LogoutButton /> : <LoginButton />}
        </nav>
      </div>
    </header>
  );
};

export default Header;
