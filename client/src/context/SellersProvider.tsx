"use client";

import { Seller } from "@/interfaces";
import React, { ReactNode, createContext, useContext, useState } from "react";

interface SellersContextProps {
  sellers: Seller[];
  setSellers: (sellers: Seller[]) => void;
}

interface SellersProviderProps {
  children: ReactNode;
}

const SellersContext = createContext<SellersContextProps>(
  {} as SellersContextProps
);

export const SellersProvider = ({ children }: SellersProviderProps) => {
  const [sellers, setSellers] = useState<Seller[]>([]);

  return (
    <SellersContext.Provider value={{ sellers, setSellers }}>
      {children}
    </SellersContext.Provider>
  );
};

export function useSellers() {
  const context = useContext(SellersContext);
  return context;
}
