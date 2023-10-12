"use client";

import { SalesTable, UploadFile } from "@/components";
import { useSales } from "@/context";

export default function Home() {
  const { sales } = useSales();
  return (
    <div style={{ marginTop: 80 }}>
      <UploadFile />
      <SalesTable sales={sales} />
    </div>
  );
}
