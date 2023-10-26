import { getCurrentUser } from "@/lib/session";
import LandingHero from "./_components/landing-hero";
import LandingTwoBoxes from "./_components/landing-two-boxes";
import { Github } from "lucide-react";

const LandingPage = async () => {
  const user = await getCurrentUser();

  return (
    <div className="h-full ">
      <LandingHero />
      <LandingTwoBoxes isSignedIn={user ? true : false} />
      <div className="flex flex-col justify-center items-center px-4 py-4">
        <span>Let&rsquo;s contribute to this app!</span>
        <a
          href="https://github.com/uzanenis/Job-Fitty"
          className="flex items-center mt-2 rounded-sm bg-gray-800 hover:bg-gray-700 transition-transform text-white px-2 py-2"
          target="_blank"
          rel="noreferrer"
        >
          View on <Github className="ml-2" />
        </a>
      </div>
    </div>
  );
};

export default LandingPage;
