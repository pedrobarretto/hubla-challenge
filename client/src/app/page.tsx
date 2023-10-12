"use client";

import { SalesTable } from "@/components";
import { useSales } from "@/context";

export default function Home() {
  const { sales } = useSales();
  return (
    <div style={{ marginTop: 80 }}>
      <SalesTable sales={sales} />
    </div>
  );
}
