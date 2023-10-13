import React from "react";
import { Seller } from "../../interfaces";
import { formatDate } from "../../utils";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Box,
  Text,
} from "@chakra-ui/react";

interface SellersTableProps {
  sellers: Seller[];
}

export const SellersTable: React.FC<SellersTableProps> = ({ sellers }) => {
  return (
    <Box maxH="400px" overflowY="auto" margin={4}>
      <Text>Tabela de Vendedores</Text>
      <Table variant="striped">
        <TableCaption>Lista de Vendedores</TableCaption>
        <Thead backgroundColor="brand.primary">
          <Tr>
            <Th color="brand.secondary">ID</Th>
            <Th color="brand.secondary">Vendedor</Th>
            <Th color="brand.secondary">Data</Th>
            <Th color="brand.secondary">Lucro</Th>
          </Tr>
        </Thead>
        <Tbody>
          {sellers.length === 0 ? (
            <Tr>
              <Td colSpan={6} color="brand.secondary">
                Nenhum vendedor cadastrado
              </Td>
            </Tr>
          ) : (
            sellers.map((seller) => (
              <Tr key={seller.id}>
                <Td color="brand.secondary">{seller.id}</Td>
                <Td color="brand.secondary">{seller.name}</Td>
                <Td color="brand.secondary">{formatDate(seller.date)}</Td>
                <Td color="brand.secondary">{seller.value}</Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
    </Box>
  );
};
