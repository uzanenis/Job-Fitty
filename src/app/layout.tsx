import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ContextProvider } from "@/components/context-provider";
import Header from "@/components/header";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Interview",
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
          "min-h-screen flex flex-col bg-background",
          inter.className
        )}
      >
        <ContextProvider>
          <Header />
          <div className="">{children}</div>
          <Toaster />
        </ContextProvider>
      </body>
    </html>
  );
}
