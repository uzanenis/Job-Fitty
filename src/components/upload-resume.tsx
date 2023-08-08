"use client";

import React, { use, useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "./ui/use-toast";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";

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

const UploadResume = ({ userId }: UploadResumeProps) => {
  const supabase = createClientComponentClient();
  const cdnUrl = `https://tkefcayfqqsgntdcklpy.supabase.co/storage/v1/object/public/resumes/${userId}/`;
  const { toast } = useToast();
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

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    try {
      const { data, error: uploadError } = await supabase.storage
        .from("resumes")
        .upload(userId + "/" + uuidv4(), file);
      if (uploadError) {
        console.error(uploadError);
      } else {
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
        await getResumes();
        console.log("PDF başarıyla yüklendi!");
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
    <form onSubmit={handleSubmit}>
      <input accept="application/pdf" type="file" onChange={handleChange} />
      <Button type="submit">Yükle</Button>
      {loading ? (
        <div>Yükleniyor...</div>
      ) : (
        <div>
          {resumes &&
            resumes.map((resume: Resume) => (
              <div key={resume.id}>
                <a href={cdnUrl + resume.name} target="_blank">
                  {resume.name}
                </a>
              </div>
            ))}
        </div>
      )}
    </form>
  );
};

export default UploadResume;
