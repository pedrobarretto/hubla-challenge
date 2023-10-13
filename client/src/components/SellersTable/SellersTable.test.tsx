/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import { SellersTable } from "./SellersTable";
import { formatDate } from "../../utils";

const sampleSellersData = [
  {
    id: 1,
    date: "2023-01-15",
    name: "Seller 1",
    value: 100,
  },
  {
    id: 2,
    date: "2023-02-20",
    name: "Seller 2",
    value: 200,
  },
];

describe("SellersTable Component", () => {
  it("renders a table with the correct headers", () => {
    render(<SellersTable sellers={sampleSellersData} />);

    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Data")).toBeInTheDocument();
    expect(screen.getByText("Vendedor")).toBeInTheDocument();
    expect(screen.getByText("Lucro")).toBeInTheDocument();
  });

  it("displays sellers data when sellers array is not empty", () => {
    render(<SellersTable sellers={sampleSellersData} />);

    sampleSellersData.forEach((seller) => {
      expect(screen.getByText(seller.id.toString())).toBeInTheDocument();
      expect(screen.getByText(formatDate(seller.date))).toBeInTheDocument();
      expect(screen.getByText(seller.name)).toBeInTheDocument();
      expect(screen.getByText(seller.value.toString())).toBeInTheDocument();
    });
  });

  it("displays a message when sellers array is empty", () => {
    render(<SellersTable sellers={[]} />);

    expect(screen.getByText("Nenhum vendedor cadastrado")).toBeInTheDocument();
  });
});
