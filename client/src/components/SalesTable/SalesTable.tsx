import React from "react";
import { Sale } from "../../interfaces";
import { formatDate, handleSaleType } from "@/utils";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Box,
} from "@chakra-ui/react";

interface SalesTableProps {
  sales: Sale[];
}

export const SalesTable: React.FC<SalesTableProps> = ({ sales }) => {
  return (
    <Box maxH="400px" overflowY="auto">
      <Table variant="striped">
        <TableCaption>Lista de Vendas</TableCaption>
        <Thead backgroundColor="brand.primary">
          <Tr>
            <Th color="brand.secondary">Tipo</Th>
            <Th color="brand.secondary">Data</Th>
            <Th color="brand.secondary">Produto</Th>
            <Th color="brand.secondary">Valor</Th>
            <Th color="brand.secondary">Vendedor</Th>
            <Th color="brand.secondary">ID</Th>
          </Tr>
        </Thead>
        <Tbody>
          {sales.map((sale) => (
            <Tr key={sale.id}>
              <Td color="brand.secondary">{handleSaleType(sale.type)}</Td>
              <Td color="brand.secondary">{formatDate(sale.date)}</Td>
              <Td color="brand.secondary">{sale.product}</Td>
              <Td color="brand.secondary">{sale.value}</Td>
              <Td color="brand.secondary">{sale.seller}</Td>
              <Td color="brand.secondary">{sale.id}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};