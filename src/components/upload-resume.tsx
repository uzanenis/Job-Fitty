"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "./ui/use-toast";
import { useForm } from "react-hook-form";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
interface UploadResumeProps {
  userId: string;
}

interface Resume {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  last_accessed_at: string;
  metadata: {
    size: number;
    mime_type: string;
  };
}

const formDataSchema = z.object({
  candidateName: z.string().optional(),
  resume: z.any(),
});

type FormData = z.infer<typeof formDataSchema>;

const UploadResume = ({ userId }: UploadResumeProps) => {
  const supabase = createClientComponentClient();
  const cdnUrl = `https://tkefcayfqqsgntdcklpy.supabase.co/storage/v1/object/public/resumes/${userId}/`;
  const { toast } = useToast();
  const form = useForm<FormData>({
    resolver: zodResolver(formDataSchema),
    mode: "onSubmit",
    defaultValues: {
      candidateName: "",
      resume: null,
    },
  });

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    getResumes();
  }, [loading]);

  const getResumes = async () => {
    const { data, error } = await supabase.storage
      .from("resumes")
      .list(userId + "/", {
        limit: 10,
        offset: 0,
        sortBy: { column: "created_at", order: "desc" },
      });
    if (error) {
      console.error(error);
    } else {
      //@ts-ignore
      setResumes(data);
      console.log(data);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) {
      throw new Error("You must select an pdf to upload.");
    }
    setFile(event.target.files[0]);
  };

  const onSubmit = async (data: FormData) => {
    if (!file) {
      throw new Error("You must select an pdf to upload.");
    }
    const newName = data.candidateName?.replace(" ", "-");
    try {
      setLoading(true);
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("resumes")
        .upload(userId + "/" + newName + uuidv4(), file);
      if (uploadError) {
        console.error(uploadError);
      } else {
        setFile(null);

        toast({
          title: "Success!",
          description: "Analyze It",
          action: (
            <Link
              href="/dashboard/resume"
              className={buttonVariants({ variant: "outline" })}
            >
              Analyze Resume
            </Link>
          ),
        });
        form.reset();
        await getResumes();
        console.log("PDF başarıyla yüklendi!", uploadData);
      }
    } catch (error) {
      toast({
        title: "Error!",
        description: "Something went wrong",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Form {...form}>
        <form
          className="flex flex-col gap-3 mt-5"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            name="candidateName"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Candidate Name (optional)</FormLabel>
                <Input {...field} placeholder="Candidate Name" />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="resume"
            control={form.control}
            render={({ field: { value, onChange, ...field } }) => (
              <FormItem className="w-full">
                <FormLabel>Pdf File</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={value?.fileName}
                    onChange={handleChange}
                    type="file"
                    accept="application/pdf"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-fit text-accent mt-2">
            {loading ? (
              <>
                Yükleniyor <Loader2 className="mx-2 h-4 w-4 animate-spin" />
              </>
            ) : (
              "Upload Resume"
            )}
          </Button>
        </form>
      </Form>
      {loading ? (
        <Loader2 className="mx-2 h-16 w-16 animate-spin" />
      ) : (
        <div>
          {resumes.length > 0 &&
            resumes.map((resume: Resume) => (
              <div key={resume.id}>
                <a href={cdnUrl + resume.name} target="_blank">
                  {resume.name}
                </a>
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default UploadResume;
