import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import "../styles/globals.css";
import { Providers } from "@/components/providers";
import Header from "@/components/Header";
import { cookies } from "next/headers";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["200", "400", "700"],
});

export const metadata: Metadata = {
  title: "ToMi App",
  description: "Um aplicativo de gerenciamento de tarefas e objetivos",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const token = cookieStore.get("fake_jwt")?.value;

  const showHeader = Boolean(token);

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${poppins.variable} grid min-h-screen max-h-screen w-full grid-rows-[auto_1fr_auto] p-2 md:p-4`}
      >
        <Providers>
          {showHeader && <Header />}

          {/* MAIN (centralizado automaticamente) */}
          <main className="grid place-items-center overflow-hidden">
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
