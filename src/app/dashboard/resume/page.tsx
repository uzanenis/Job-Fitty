import UploadResume from "@/components/upload-resume";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

const ResumePage = async () => {
  const user = await getCurrentUser();
  if (!user) redirect("/auth");

  return (
    <div>
      <h2>Upload Resume</h2>
      <UploadResume userId={user?.id} />
    </div>
  );
};

export default ResumePage;
