import { ModeToggle } from "@/components/mode-toggle";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const users = await prisma.user.findMany();
  console.log(users);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ModeToggle />
    </main>
  );
}
