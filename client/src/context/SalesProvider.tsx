"use client";

import { Sale } from "@/interfaces";
import React, { ReactNode, createContext, useContext, useState } from "react";

interface SalesContextProps {
  sales: Sale[];
  setSales: (sales: Sale[]) => void;
}

interface SalesProviderProps {
  children: ReactNode;
}

const SalesContext = createContext<SalesContextProps>({} as SalesContextProps);

export const SalesProvider = ({ children }: SalesProviderProps) => {
  const [sales, setSales] = useState<Sale[]>([]);

  return (
    <SalesContext.Provider value={{ sales, setSales }}>
      {children}
    </SalesContext.Provider>
  );
};

export function useSales() {
  const context = useContext(SalesContext);
  return context;
}
