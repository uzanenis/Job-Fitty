import { ModeToggle } from "@/components/mode-toggle";
import { LoginButton, LogoutButton } from "@/components/ui/buttons";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

export default async function Home() {
  const users = await prisma.user.findMany();
  console.log(users);

  const user = await getCurrentUser();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ModeToggle />
      {user ? <LogoutButton /> : <LoginButton />}
    </main>
  );
}
