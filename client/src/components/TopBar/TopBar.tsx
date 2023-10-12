import React from "react";
import { Button } from "../Button/Button";
import { UploadFile } from "../UploadFile/UploadFile";

export const TopBar: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#333",
        padding: "10px 20px",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
      }}
    >
      <span style={{ color: "#b8ee44", fontSize: 24, fontWeight: 600 }}>
        HUBLA
      </span>
      <input
        type="text"
        style={{
          padding: 10,
          border: "1px solid #ccc",
          borderRadius: 5,
          marginRight: 10,
        }}
      />
      {/* <UploadFile /> */}
      <Button title="Upload de arquivo" />
    </div>
  );
};
