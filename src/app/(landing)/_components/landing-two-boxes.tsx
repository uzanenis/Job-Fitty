import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const LandingTwoBoxes = ({ isSignedIn }: { isSignedIn: boolean }) => {
  return (
    <div className="w-full h-full flex flex-col my-4 md:flex-row items-center justify-around relative min-h-fit">
      <div>
        <div className="h-full max-w-lg text-xl md:text-2xl text-center">
          Create your job post, upload candidates resumes and get your
          AI-powered candidate score!
        </div>
        <div className="flex justify-center items-center mt-4">
          {isSignedIn ? (
            <Link href="/dashboard/resume">
              <Button className="bg-gradient-to-r from-indigo-400 to-purple-600 text-white">
                Go to Dashboard
              </Button>
            </Link>
          ) : (
            <Link href="/api/auth/signin">
              <Button className="bg-gradient-to-r from-indigo-400 to-purple-600 text-white">
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
      <Image
        src="/landing-brain.png"
        width={470}
        height={470}
        alt="brain"
        loading="lazy"
        className="animate-move-up-down"
      />
    </div>
  );
};

export default LandingTwoBoxes;
