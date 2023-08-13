"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();
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
import { createPdfFile } from "@/app/dashboard/resume/actions";
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

  const pdfToText = async (file: File, url: string, fileName: string) => {
    const fileReader = new FileReader();
    fileReader.onload = async () => {
      const typedarray = new Uint8Array(fileReader.result as ArrayBuffer);
      const pdf = await pdfjs.getDocument(typedarray).promise;
      const numberOfPages = pdf.numPages;
      let chunks = [];
      for (let i = 1; i <= numberOfPages; i++) {
        const page = await pdf.getPage(i);
        const text = await page.getTextContent();
        const pageText = text.items
          .map((item) =>
            // @ts-ignore
            item.str
              .replace(
                /[^a-zA-Z0-9\s\d.,!?/()\[\]{}:;'"<>@#$%^&*_+=|\\\-]/g,
                ""
              )
              .replace(/\s+/g, " ")
          )
          .join("");
        chunks.push(pageText);
      }
      const text = chunks.join("\n");
      const data = {
        fileName,
        fileUrl: url,
        fileText: text,
      };
      await createPdfFile(data);
      console.log(text);
    };
    fileReader.readAsArrayBuffer(file);
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
    try {
      setLoading(true);
      const newName = data.candidateName?.replace(" ", "-");
      let fileNameTemp = newName + "--" + uuidv4();
      const fileName = userId + "/" + fileNameTemp;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("resumes")
        .upload(fileName, file);
      if (uploadError) {
        console.error(uploadError);
      } else {
        setFile(null);
        const url = cdnUrl + fileNameTemp;
        await pdfToText(file, url, fileNameTemp);
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
    </>
  );
};

export default UploadResume;
