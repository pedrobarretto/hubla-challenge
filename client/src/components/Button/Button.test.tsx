/**
 * @jest-environment jsdom
 */
import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import { Button } from "./Button";

describe("Button Component", () => {
  it("renders a button with the provided title", () => {
    const { getByText } = render(<Button title="Click Me" />);
    const buttonElement = getByText("Click Me");
    expect(buttonElement).toBeInTheDocument();
  });

  it("applies hover styles when hovered over", () => {
    const { getByText } = render(<Button title="Hover Me" />);
    const buttonElement = getByText("Hover Me");

    fireEvent.mouseEnter(buttonElement);
    expect(buttonElement).toHaveStyle("background-color: #95bf3b");

    fireEvent.mouseLeave(buttonElement);
    expect(buttonElement).toHaveStyle("background-color: #b8ee44");
  });

  it("calls the onClick function when clicked", () => {
    const onClickMock = jest.fn();
    const { getByText } = render(
      <Button title="Click Me" onClick={onClickMock} />
    );
    const buttonElement = getByText("Click Me");

    fireEvent.click(buttonElement);
    expect(onClickMock).toHaveBeenCalled();
  });

  it("passes additional props to the button element", () => {
    const { getByText } = render(
      <Button title="Custom Props" id="custom-button" data-test="custom" />
    );
    const buttonElement = getByText("Custom Props");

    expect(buttonElement).toHaveAttribute("id", "custom-button");
    expect(buttonElement).toHaveAttribute("data-test", "custom");
  });
});
