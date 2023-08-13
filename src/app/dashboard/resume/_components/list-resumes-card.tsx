import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FileMinus, MoveRight } from "lucide-react";
import Link from "next/link";

const ListResumesCard = () => {
  return (
    <Card className="flex flex-col border-2 border-slate-300">
      <CardHeader>
        <div className="flex items-center">
          <FileMinus className="justify-self-center" size={40} />
          <h2 className="text-3xl font-bold ml-3">View all resumes</h2>
        </div>
        <p className="font-light">
          List all resumes that you have posted on the platform
        </p>
      </CardHeader>
      <CardContent>
        <Link href="/dashboard/resume/all">
          <Button className="w-full bg-blue-600 rounded-full flex items-center justify-between text-white hover:bg-blue-800">
            View all resumes
            <MoveRight className="justify-self-center" size={24} />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default ListResumesCard;
