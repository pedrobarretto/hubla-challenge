/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { AfiliatesTable, Button, SalesTable } from "@/components";
import { SellersTable } from "@/components/SellersTable/SellersTable";
import { useAfiliates, useSales, useSellers } from "@/context";
import { Box, Flex } from "@chakra-ui/react";
import { useEffect } from "react";

export default function Home() {
  const { sales, setSales } = useSales();
  const { sellers, setSellers } = useSellers();
  const { afiliates, setAfiliates } = useAfiliates();

  useEffect(() => {
    getAllSales();
    getAllSellers();
    getAllAfiliates();
  }, []);

  const getAllSales = async () => {
    try {
      const sales = await fetch("http://localhost:8000/sales", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
      setSales(sales);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllSellers = async () => {
    try {
      const sellers = await fetch("http://localhost:8000/sellers", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
      setSellers(sellers);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllAfiliates = async () => {
    try {
      const afiliates = await fetch("http://localhost:8000/afiliates", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
      setAfiliates(afiliates);
    } catch (error) {
      console.log(error);
    }
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
