"use client";

import { useState } from "react";
import { Button, Input } from "../";
import { useSales } from "../../context";

export function UploadFile({ onClose }: { onClose: () => void }) {
  const { setSales } = useSales();
  const [formData, setFormData] = useState({
    file: null,
  });

  const onSubmit = async () => {
    if (formData.file) {
      const reader = new FileReader();
      reader.onload = async function (e) {
        if (e && e.target) {
          const body = JSON.stringify({ sale: e.target.result });
          const data = await fetch("http://localhost:8000/sales", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body,
          }).then((res) => res.json());
          setSales(data);
        }
      };
      reader.readAsText(formData.file);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit();
    onClose();
  };

  const handleFileChange = (e: any) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input handleFileChange={handleFileChange} title="Escolher arquivo" />
      <Button title="Enviar arquivo" type="submit" />
    </form>
  );
}
