import React from "react";
import { Sale } from "../../interfaces";
import { handleSaleType } from "@/utils";

interface SalesTableProps {
  sales: Sale[];
}

export const SalesTable: React.FC<SalesTableProps> = ({ sales }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Tipo</th>
          <th>Data</th>
          <th>Produto</th>
          <th>Valor</th>
          <th>Vendedor</th>
          <th>ID</th>
        </tr>
      </thead>
      <tbody>
        {sales.map((sale) => (
          <tr key={sale.id}>
            <td>{handleSaleType(sale.type)}</td>
            <td>{sale.date}</td>
            <td>{sale.product}</td>
            <td>{sale.value}</td>
            <td>{sale.seller}</td>
            <td>{sale.id}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
