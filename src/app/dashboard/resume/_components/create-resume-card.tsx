"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import UploadResume from "@/components/upload-resume";
import { MoveRight, Upload } from "lucide-react";
import { useState } from "react";

const UploadResumeCard = ({ userId }: { userId: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Card className="flex flex-col border-2 border-slate-300">
        <CardHeader>
          <div className="flex items-center">
            <Upload className="justify-self-center" size={40} />
            <h2 className="text-3xl font-bold ml-3">Upload a Resume</h2>
          </div>
          <p className="font-light min-h-[48px]">
            Upload a resume for analyze candidates score
          </p>
        </CardHeader>
        <CardContent>
          <DialogTrigger asChild>
            <Button className="w-full bg-green-600 rounded-full flex items-center justify-between text-white hover:bg-green-700">
              Let&rsquo;s create a new one!
              <MoveRight className="justify-self-center" size={24} />
            </Button>
          </DialogTrigger>
        </CardContent>
      </Card>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-3xl font-bold my-3">Create a job</h2>
        </DialogHeader>
        <UploadResume userId={userId} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default UploadResumeCard;
