"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { createJob, editJob } from "./actions";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Job } from "@prisma/client";

const formDataSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  experience: z.string().min(1),
  position: z.string().min(1),
  technologies: z.string().min(1),
  workType: z.string().min(1),
  // Add more validation for other fields as needed
});

type FormData = z.infer<typeof formDataSchema>;

interface CreateJobFormProps {
  job?: Job;
}

const CreateJobForm = ({ job }: CreateJobFormProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const isCreateMode = !job;

  const form = useForm<FormData>({
    resolver: zodResolver(formDataSchema),
    mode: "onSubmit",
    defaultValues: {
      title: job?.title || "",
      description: job?.description || "",
      experience: job?.experience || "",
      position: job?.position || "",
      technologies: job?.technologies.join(",") || "",
      workType: job?.workType || "",
      // Set default values for other fields as needed
    },
  });

  const updateJob = async (data: FormData) => {
    try {
      setLoading(true);
      const responseData = await editJob({
        id: job?.id,
        title: data.title,
        description: data.description,
        experience: data.experience,
        position: data.position,
        technologies: data.technologies.split(","),
        workType: data.workType,
      });

      console.table(responseData);

      toast({
        title: "Success!",
        description: "Job post updated successfully",
        duration: 5000,
        action: (
          <Link
            href="/dashboard/companyjobs/jobs"
            className={buttonVariants({ variant: "outline" })}
          >
            Let's see your job posts
          </Link>
        ),
      });

      form.reset();
    } catch (err) {
      console.error(err);
      toast({
        title: "Error!",
        description: "Something went wrong",
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  const createNewJob = async (data: FormData) => {
    try {
      setLoading(true);
      const responseData = await createJob({
        title: data.title,
        description: data.description,
        experience: data.experience,
        position: data.position,
        technologies: data.technologies.split(","),
        workType: data.workType,
      });

      console.table(responseData);

      toast({
        title: "Success!",
        description: "Job post added successfully",
        duration: 5000,
        action: (
          <Link
            href="/dashboard/companyjobs/jobs"
            className={buttonVariants({ variant: "outline" })}
          >
            Let's see your job posts
          </Link>
        ),
      });

      form.reset();
    } catch (err) {
      console.error(err);
      toast({
        title: "Error!",
        description: "Something went wrong",
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  async function onSubmit(data: FormData) {
    if (isCreateMode) {
      await createNewJob(data);
    } else {
      await updateJob(data);
    }
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-3 mt-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          name="title"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Job Title</FormLabel>
              <Input placeholder="Job Title" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Job Description</FormLabel>
              <Input placeholder="Job Description" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="experience"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Experience</FormLabel>
              <Input placeholder="Experience" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="position"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Position</FormLabel>
              <Input placeholder="Position" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="technologies"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Technologies</FormLabel>
              <Input placeholder="Technologies" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="workType"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Work Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Work Type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    {["Remote", "Onsite", "Hybrid"].map((item, index) => (
                      <SelectItem key={index} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormDescription>
                You can manage work type after create your job post.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-fit text-accent" type="submit">
          {loading ? (
            <>
              Loading <Loader2 className="mx-2 h-4 w-4 animate-spin" />
            </>
          ) : job ? (
            "Edit Job"
          ) : (
            "Create Job"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default CreateJobForm;
