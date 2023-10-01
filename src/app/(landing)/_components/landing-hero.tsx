"use client";

import TypewriterComponent from "typewriter-effect";

const LandingHero = () => {
  return (
    <section className="text-white font-bold pt-10 md:pt-20 space-y-5">
      <div className="rounded-full border-2 border-white w-fit p-2 text-xs text-neutral-50 m-auto">
        Announcing Demo
      </div>
      <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl space-y- font-extrabold text-center">
        <h1>The Easiest Way to Analyze Candidates</h1>
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-600">
          <TypewriterComponent
            options={{
              strings: [
                "Create Job Post",
                "Upload Resume",
                "Analyze Resume with AI",
                "Get Candidate's Score",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
      <div className="flex sm:flex-col items-center"></div>
    </section>
  );
};

export default LandingHero;
