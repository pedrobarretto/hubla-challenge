import { Inter } from "next/font/google";
import { Providers } from "./providers";
import { TopBar } from "@/components";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Hubla Challenge",
  description: "Desafio técnico para Hubla",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <TopBar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
