import "./globals.css";
import "react-circular-progressbar/dist/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ContextProvider } from "@/components/context-provider";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import NextTopLoader from "nextjs-toploader";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Job Fitty",
  description:
    "Smart Hiring Starts Here: Empower Your Decisions with AI Insights.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen flex flex-col bg-background antialiased",
          inter.className
        )}
      >
        <ContextProvider>
          <NextTopLoader color="#4c92f8" showSpinner={false} />
          {children}
          <Analytics />
          <Toaster />
        </ContextProvider>
      </body>
    </html>
  );
}
