import React from "react";
import { Afiliates } from "../../interfaces";
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

interface AfiliatesTableProps {
  afiliates: Afiliates[];
}

export const AfiliatesTable: React.FC<AfiliatesTableProps> = ({
  afiliates,
}) => {
  return (
    <Box maxH="400px" overflowY="auto" margin={4}>
      <Text>Tabela de Afiliados</Text>
      <Table variant="striped">
        <TableCaption>Lista de Afiliados</TableCaption>
        <Thead backgroundColor="brand.primary">
          <Tr>
            <Th color="brand.secondary">ID</Th>
            <Th color="brand.secondary">Data</Th>
            <Th color="brand.secondary">Vendedor</Th>
            <Th color="brand.secondary">Lucro</Th>
          </Tr>
        </Thead>
        <Tbody>
          {afiliates.length === 0 ? (
            <Tr>
              <Td colSpan={6} color="brand.secondary" id="none-seller">
                Nenhum vendedor afliado cadastrado
              </Td>
            </Tr>
          ) : (
            afiliates.map((afiliate) => (
              <Tr key={afiliate.id}>
                <Td color="brand.secondary">{afiliate.id}</Td>
                <Td color="brand.secondary">{formatDate(afiliate.date)}</Td>
                <Td color="brand.secondary">{afiliate.name}</Td>
                <Td color="brand.secondary">{afiliate.value}</Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
    </Box>
  );
};
