"use client";

import { useState } from "react";

export default function UploadFile() {
  const [file, setFile] = useState();
  const [formData, setFormData] = useState({
    file: null,
  });

  const onSubmit = async () => {
    if (formData.file) {
      const reader = new FileReader();
      reader.onload = async function (e) {
        if (e && e.target) {
          const body = JSON.stringify({ sell: e.target.result });
          await fetch("http://localhost:8000/sells", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body,
          });
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
