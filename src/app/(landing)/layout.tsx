import Header from "@/components/header";
import React from "react";

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className="h-full bg-background/10 backdrop-blur-md dark:bg-[#111827] overflow-auto">
        <div className="mx-auto max-w-screen-xl h-full w-full">{children}</div>
      </main>
    </>
  );
};

export default LandingLayout;
