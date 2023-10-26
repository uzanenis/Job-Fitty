"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MoveRight, PlusSquare } from "lucide-react";
import CreateJobForm from "./create-job-form";

const CreateJobCard = () => {
  return (
    <Dialog>
      <Card className="flex flex-col border-2 border-slate-300">
        <CardHeader>
          <div className="flex items-center">
            <PlusSquare className="justify-self-center" size={40} />
            <h2 className="text-3xl font-bold ml-3">Create a job</h2>
          </div>
          <p className="font-light">Create a new job for analyze candidates</p>
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
        <CreateJobForm />
      </DialogContent>
    </Dialog>
  );
};

export default CreateJobCard;
