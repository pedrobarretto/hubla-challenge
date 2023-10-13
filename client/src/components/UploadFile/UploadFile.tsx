"use client";

import { useState } from "react";
import { Button, Input } from "../";
import { useSales } from "../../context";
import { Flex, useToast } from "@chakra-ui/react";

export function UploadFile({ onClose }: { onClose: () => void }) {
  const { setSales } = useSales();
  const toast = useToast();
  const [formData, setFormData] = useState({
    file: null,
  });

  const onSubmit = async () => {
    if (formData.file) {
      const reader = new FileReader();
      reader.onload = async function (e) {
        if (e && e.target) {
          const body = JSON.stringify({ sale: e.target.result });
          await fetch("http://localhost:8000/sales", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body,
          }).then(async (res) => {
            const response = await res.json();
            if (response.statusCode && response.statusCode !== 201) {
              toast({
                title: "Erro ao enviar arquivo!",
                description: response?.message || "Formato do arquivo inválido",
                status: "error",
                duration: 9000,
                isClosable: true,
                position: "top-right",
              });
            } else {
              setSales(response);
              toast({
                title: "Arquivo enviado",
                description: "Vendas registradas com sucesso",
                status: "success",
                duration: 9000,
                isClosable: true,
                position: "top-right",
              });
            }
          });
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
      <Flex direction="row" justifyContent="space-between" alignItems="center">
        <Input handleFileChange={handleFileChange} title="Escolher arquivo" />
        <Button title="Enviar arquivo" type="submit" />
      </Flex>
    </form>
  );
}
