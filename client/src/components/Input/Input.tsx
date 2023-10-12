"use client";

import React, { useState } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title: string;
  handleFileChange: (e: any) => void;
}

export const Input: React.FC<InputProps> = ({
  title,
  handleFileChange,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedFileName, setSelectedFileName] =
    useState("Escolha um arquivo");

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

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFileName(e.target.files[0].name);
      handleFileChange(e);
    } else {
      setSelectedFileName("Escolha um arquivo");
    }
  };

  return (
    <label style={buttonStyle}>
      {selectedFileName}
      <input
        type="file"
        id="file"
        name="file"
        accept=".txt"
        onChange={handleFileSelect}
        style={{ display: "none", ...buttonStyle }}
        {...props}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
    </label>
  );
};
