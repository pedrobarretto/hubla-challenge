"use client";

import React, { useState } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
}

export const Button: React.FC<ButtonProps> = ({ title, ...props }) => {
  const [isHovered, setIsHovered] = useState(false);

  const buttonStyle: React.CSSProperties = {
    cursor: "pointer",
    backgroundColor: isHovered ? "#95bf3b" : "#b8ee44",
    color: "#314000",
    borderRadius: "10px",
    padding: "10px 20px",
    border: "2px solid #314000",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    fontSize: "16px",
    transition: "background-color 0.3s, color 0.3s",
  };

  return (
    <button
      {...props}
      style={buttonStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {title}
    </button>
  );
};
