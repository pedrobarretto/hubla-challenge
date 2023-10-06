"use client";

import { parseFile } from "@/utils";
import { useState } from "react";

export default function UploadFile() {
  const [file, setFile] = useState();
  const [formData, setFormData] = useState({
    file: null,
  });

  const onSubmit = () => {
    if (formData.file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        if (e && e.target) {
          const fileContent = e.target.result;
          const parsedFile = parseFile(fileContent);
          console.log("Arquivo tratado: ", parsedFile);
        }
      };
      reader.readAsText(formData.file);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit();
  };

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
    setFormData({ ...formData, file: e.target.files[0] });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        id="file"
        name="file"
        accept=".txt"
        onChange={handleFileChange}
      />
      <button type="submit">Enviar</button>
    </form>
  );
}
