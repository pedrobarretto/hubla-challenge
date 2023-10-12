import { SalesProvider } from "@/context";

export function Providers({ children }: { children: React.ReactNode }) {
  return <SalesProvider>{children}</SalesProvider>;
}
