import { PrevButton } from "@/components/ui/buttons";
import UploadResume from "@/components/upload-resume";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

const ResumePage = async () => {
  const user = await getCurrentUser();
  if (!user) redirect("/auth");

  return (
    <section>
      <UploadResume userId={user?.id} />
    </section>
  );
};

export default ResumePage;
