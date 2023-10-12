"use client";

import React from "react";
import { Button } from "../Button/Button";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { UploadFile } from "../UploadFile/UploadFile";

const SaleModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Upload de Arquivo de Vendas</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <UploadFile />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export const TopBar: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
      <Button onClick={onOpen} title="Upload de arquivo" />

      <SaleModal isOpen={isOpen} onClose={onClose} />
    </div>
  );
};
