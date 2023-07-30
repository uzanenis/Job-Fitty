"use client";

import React, { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const UploadResume = () => {
  const supabase = createClientComponentClient();

  const [file, setFile] = useState<File | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    const { data, error } = await supabase.storage
      .from("resumes")
      .upload(`resume-${Date.now()}-${file.name}`, file);
    if (error) {
      console.error(error);
    } else {
      console.log("PDF başarıyla yüklendi!", data);

      // const { data: insertedData, error: insertError } = await supabase
      //   .from('user_pdfs') // 'user_pdfs' adlı tabloya ekle
      //   .insert({ user_id: 'USER_ID', file_name: data?.Key || '', file_url: data?.Location || '' });

      // if (insertError) {
      //   console.error('PDF kayıt hatası:', insertError.message);
      // } else {
      //   console.log('PDF başarıyla yüklendi ve kaydedildi!', insertedData);
      //   setFile(null);
      // }
    }
  };
  return (
    <div>
      <input accept="pdf" type="file" onChange={handleChange} />
      <button onClick={handleUpload}>Yükle</button>
    </div>
  );
};

export default UploadResume;
