/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { AfiliatesTable, Button, SalesTable } from "@/components";
import { SellersTable } from "@/components/SellersTable/SellersTable";
import { useAfiliates, useSales, useSellers } from "@/context";
import { Box, Flex, useToast } from "@chakra-ui/react";
import { useEffect } from "react";

export default function Home() {
  const { sales, setSales } = useSales();
  const { sellers, setSellers } = useSellers();
  const { afiliates, setAfiliates } = useAfiliates();
  const toast = useToast();

  useEffect(() => {
    getAllSales();
    getAllSellers();
    getAllAfiliates();
  }, []);

  const getAllSales = async () => {
    await fetch("http://localhost:8000/sales", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (res) => {
      const response = await res.json();
      if (response.statusCode && response.statusCode !== 200) {
        toast({
          title: "Erro ao buscar vendas",
          description:
            response?.message || "Erro inespeado ao buscar vendas atuais",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top-right",
        });
      } else {
        if (sales.length !== 0)
          toast({
            title: "Tabela de vendas atualizada",
            status: "success",
            duration: 9000,
            isClosable: true,
            position: "top-right",
          });
        setSales(response);
      }
    });
  };

  const getAllSellers = async () => {
    await fetch("http://localhost:8000/sellers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (res) => {
      const response = await res.json();
      if (response.statusCode && response.statusCode !== 200) {
        toast({
          title: "Erro ao buscar vendedores",
          description:
            response?.message || "Erro inespeado ao buscar todos os vendedores",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top-right",
        });
      } else {
        if (sellers.length !== 0)
          toast({
            title: "Tabela de vendedores atualizada",
            status: "success",
            duration: 9000,
            isClosable: true,
            position: "top-right",
          });
        setSellers(response);
      }
    });
  };

  const getAllAfiliates = async () => {
    await fetch("http://localhost:8000/afiliates", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (res) => {
      const response = await res.json();
      if (response.statusCode && response.statusCode !== 200) {
        toast({
          title: "Erro ao buscar afiliados",
          description:
            response?.message || "Erro inespeado ao buscar todos os afiliados",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top-right",
        });
      } else {
        if (afiliates.length !== 0)
          toast({
            title: "Tabela de afiliados atualizada",
            status: "success",
            duration: 9000,
            isClosable: true,
            position: "top-right",
          });
        setAfiliates(response);
      }
    });
  };

  return (
    <div style={{ marginTop: 80 }}>
      <Button
        title="Atualizar tabela"
        onClick={getAllSales}
        style={{ marginLeft: 15 }}
      />
      <SalesTable sales={sales} />
      <Flex
        justifyContent="space-between"
        flexWrap="wrap"
        flexDirection={{ base: "column", md: "row" }}
      >
        <Box flex="1" width="100%" mb={{ base: 4, md: 0 }}>
          <Button
            title="Atualizar tabela"
            onClick={getAllSellers}
            style={{ marginLeft: 15 }}
          />
          <SellersTable sellers={sellers} />
        </Box>
        <Box flex="1" width="100%">
          <Button
            title="Atualizar tabela"
            onClick={getAllAfiliates}
            style={{ marginLeft: 15 }}
          />
          <AfiliatesTable afiliates={afiliates} />
        </Box>
      </Flex>
    </div>
  );
}
