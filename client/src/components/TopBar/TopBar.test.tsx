/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import React from "react";
import { render, fireEvent, getByTestId } from "@testing-library/react";
import { TopBar } from "./TopBar";

describe("TopBar Component", () => {
  it("renders the TopBar component", () => {
    const { getByText } = render(<TopBar />);
    expect(getByText("HUBLA")).toBeInTheDocument();
    expect(getByText("Upload de arquivo")).toBeInTheDocument();
  });

  it("opens the modal when the 'Upload de arquivo' button is clicked", () => {
    const { getByText, queryByText } = render(<TopBar />);
    const uploadButton = getByText("Upload de arquivo");

    expect(queryByText("Upload de Arquivo de Vendas")).toBeNull();

    fireEvent.click(uploadButton);

    expect(getByText("Upload de Arquivo de Vendas")).toBeInTheDocument();
  });
});
