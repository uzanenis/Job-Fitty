"use client";
import React from "react";
import { signIn, signOut } from "next-auth/react";
import { Icons } from "../icons";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const LoginButton = () => {
  return (
    <Button
      variant="outline"
      className="flex gap-2 px-4"
      onClick={() => signIn("google", { callbackUrl: "/dashboard/resume" })}
    >
      <p className="whitespace-nowrap">Sign in</p>
    </Button>
  );
};

export const LogoutButton = () => {
  return (
    <Button
      onClick={() =>
        signOut({
          callbackUrl: "/",
        })
      }
    >
      Sign Out
    </Button>
  );
};

export const PrevButton = ({
  url,
  classNames,
}: {
  url: string;
  classNames?: string;
}) => {
  const Icon = Icons.chevronLeft;
  return (
    <Button
      variant="ghost"
      asChild
      className={cn("flex gap-2 w-fit pl-0 pr-4 mb-3", classNames)}
    >
      <Link href={url}>
        <Icon className="w-5 h-5" />
        <p className="whitespace-nowrap">Prev</p>
      </Link>
    </Button>
  );
};

const CloseButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  return (
    <button
      type="button"
      className={cn(
        "w-6 h-6 relative hover:bg-monochrome-with-bg-opacity bg-opacity-10",
        className
      )}
      ref={ref}
      {...props}
    >
      <i className="absolute w-full h-[0.1rem] bg-monochrome left-0 top-1/2 -translate-y-1/2 rotate-[50deg]" />
      <i className="absolute w-full h-[0.1rem] bg-monochrome left-0 top-1/2 -translate-y-1/2 rotate-[-50deg]" />
    </button>
  );
});

CloseButton.displayName = "CloseButton";

export { CloseButton };
