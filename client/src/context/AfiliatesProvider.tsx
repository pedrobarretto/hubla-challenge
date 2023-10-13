"use client";

import { Afiliates } from "@/interfaces";
import React, { ReactNode, createContext, useContext, useState } from "react";

interface AfiliatesContextProps {
  afiliates: Afiliates[];
  setAfiliates: (afiliates: Afiliates[]) => void;
}

interface AfiliatesProviderProps {
  children: ReactNode;
}

const AfiliatesContext = createContext<AfiliatesContextProps>(
  {} as AfiliatesContextProps
);

export const AfiliatesProvider = ({ children }: AfiliatesProviderProps) => {
  const [afiliates, setAfiliates] = useState<Afiliates[]>([]);

  return (
    <AfiliatesContext.Provider value={{ afiliates, setAfiliates }}>
      {children}
    </AfiliatesContext.Provider>
  );
};

export function useAfiliates() {
  const context = useContext(AfiliatesContext);
  return context;
}
