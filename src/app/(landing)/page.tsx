import { getCurrentUser } from "@/lib/session";
import LandingHero from "./_components/landing-hero";
import LandingTwoBoxes from "./_components/landing-two-boxes";
import { Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const LandingPage = async () => {
  const user = await getCurrentUser();

  return (
    <div className="h-full ">
      <LandingHero />
      <LandingTwoBoxes isSignedIn={user ? true : false} />
      <div className="flex flex-col justify-center items-center px-4 py-4">
        <span className="mb-2">Let&rsquo;s contribute to this app!</span>
        <div className="flex items-center gap-x-2">
          <a
            href="https://github.com/uzanenis/Job-Fitty"
            className="flex items-center rounded-sm bg-gray-800 hover:bg-gray-700 transition-transform text-white px-2 py-2"
            target="_blank"
            rel="noreferrer"
          >
            View on <Github className="ml-2" />
          </a>
          <Link href="https://www.buymeacoffee.com/uzanenis" target="_blank">
            <Image
              src="https://cdn.buymeacoffee.com/buttons/v2/default-blue.png"
              alt="Buy Me A Coffee"
              width={108}
              height={60}
              className="h-full"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
