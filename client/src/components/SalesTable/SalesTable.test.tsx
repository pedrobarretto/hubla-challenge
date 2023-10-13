/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import { SalesTable } from "./SalesTable";
import { formatDate } from "../../utils";

const sampleSalesData = [
  {
    id: 1,
    type: 2,
    date: "2022-04-02 02:09:54.000 -0300",
    product: "Product A",
    value: 100,
    seller: "Seller 1",
  },
  {
    id: 2,
    type: 1,
    date: "2022-03-01 02:09:54.000 -0300",
    product: "Product B",
    value: 200,
    seller: "Seller 2",
  },
];

describe("SalesTable Component", () => {
  it("renders a table with the correct headers", () => {
    const { getByText } = render(<SalesTable sales={sampleSalesData} />);

    expect(getByText("Tipo")).toBeInTheDocument();
    expect(getByText("Data")).toBeInTheDocument();
    expect(getByText("Produto")).toBeInTheDocument();
    expect(getByText("Valor")).toBeInTheDocument();
    expect(getByText("Vendedor")).toBeInTheDocument();
    expect(getByText("ID")).toBeInTheDocument();
  });

  it("displays sales data when sales array is not empty", () => {
    render(<SalesTable sales={sampleSalesData} />);

    sampleSalesData.forEach((sale) => {
      expect(screen.getByText(sale.type)).toBeInTheDocument();
      expect(screen.getByText(formatDate(sale.date))).toBeInTheDocument();
      expect(screen.getByText(sale.product)).toBeInTheDocument();
      expect(screen.getByText(sale.value.toString())).toBeInTheDocument();
      expect(screen.getByText(sale.seller)).toBeInTheDocument();
      expect(screen.getByText(sale.id.toString())).toBeInTheDocument();
    });
  });

  it("displays a message when sales array is empty", () => {
    render(<SalesTable sales={[]} />);

    expect(
      screen.getByText("Faça o upload do arquivo para ver os dados inseridos")
    ).toBeInTheDocument();
  });
});
