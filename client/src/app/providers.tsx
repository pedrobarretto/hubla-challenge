"use client";

import { SalesProvider } from "@/context";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      primary: "#b8ee44",
      secondary: "#314000",
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        <SalesProvider>{children}</SalesProvider>
      </ChakraProvider>
    </CacheProvider>
  );
}
