/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import { AfiliatesTable } from "./AfiliatesTable";

describe("AfiliatesTable Component", () => {
  const mockAfiliates = [
    {
      id: 1,
      date: "2022-04-02 02:09:54.000 -0300",
      name: "Vendedor 1",
      value: 100,
    },
    {
      id: 2,
      date: "2022-03-01 02:09:54.000 -0300",
      name: "Vendedor 2",
      value: 200,
    },
  ];

  it("renders a table with the correct header columns", () => {
    render(<AfiliatesTable afiliates={mockAfiliates} />);

    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Data")).toBeInTheDocument();
    expect(screen.getByText("Vendedor")).toBeInTheDocument();
    expect(screen.getByText("Lucro")).toBeInTheDocument();
  });

  it("renders the correct number of rows when afiliates are provided", () => {
    render(<AfiliatesTable afiliates={mockAfiliates} />);

    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(3);
  });

  it("displays the afiliates data correctly", () => {
    render(<AfiliatesTable afiliates={mockAfiliates} />);

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("02/04/2022 02:09")).toBeInTheDocument();
    expect(screen.getByText("Vendedor 1")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();

    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("01/03/2022 02:09")).toBeInTheDocument();
    expect(screen.getByText("Vendedor 2")).toBeInTheDocument();
    expect(screen.getByText("200")).toBeInTheDocument();
  });
});
