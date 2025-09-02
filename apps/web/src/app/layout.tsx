import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import "../styles/globals.css";
import { Providers } from "@/components/providers";
import Navbar from "@/components/Navbar";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["200", "400", "700"],
});

export const metadata: Metadata = {
  title: "ToMi App",
  description: "Um aplicativo de gerenciamento de tarefas e objetivos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${poppins.variable} grid min-h-screen max-h-screen w-full grid-rows-[auto_1fr_auto] p-2 md:p-4`}
      >
        <Providers>
          <Navbar />

          {/* MAIN (centralizado automaticamente) */}
          <main className="grid place-items-center overflow-auto">
            {children}
          </main>

          <footer className="border-t border-gray-200 flex items-center justify-center h-12">
            <span className="text-sm text-muted-foreground">© 2025 ToMi</span>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
