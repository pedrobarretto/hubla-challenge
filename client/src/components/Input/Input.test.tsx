/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Input } from "./Input";

describe("Input Component", () => {
  it("renders an input element with the provided title", () => {
    const handleFileChange = jest.fn();
    const { getByText, getByLabelText } = render(
      <Input title="Escolha um arquivo" handleFileChange={handleFileChange} />
    );

    const inputElement = getByLabelText("Escolha um arquivo");
    expect(inputElement).toBeInTheDocument();
  });

  it("calls handleFileChange when a file is selected", () => {
    const handleFileChange = jest.fn();
    const { getByLabelText } = render(
      <Input title="Escolha um arquivo" handleFileChange={handleFileChange} />
    );

    const inputElement = getByLabelText("Escolha um arquivo");

    const file = new File(["file contents"], "file.txt", {
      type: "text/plain",
    });

    fireEvent.change(inputElement, {
      target: {
        files: [file],
      },
    });

    expect(handleFileChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          files: [file],
        }),
      })
    );
  });

  it("applies hover styles when hovered over", () => {
    const handleFileChange = jest.fn();
    const { getByLabelText } = render(
      <Input title="Escolha um arquivo" handleFileChange={handleFileChange} />
    );

    const inputElement = getByLabelText("Escolha um arquivo");

    fireEvent.mouseEnter(inputElement);
    expect(inputElement).toHaveStyle("background-color: #95bf3b");

    fireEvent.mouseLeave(inputElement);
    expect(inputElement).toHaveStyle("background-color: #b8ee44");
  });

  it("passes additional props to the input element", () => {
    const handleFileChange = jest.fn();
    const { getByLabelText } = render(
      <Input
        title="Escolha um arquivo"
        handleFileChange={handleFileChange}
        data-test="custom"
      />
    );

    const inputElement = getByLabelText("Escolha um arquivo");

    expect(inputElement).toHaveAttribute("data-test", "custom");
  });
});
