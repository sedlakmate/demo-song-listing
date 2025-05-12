import "../../globals.css";
import type { ReactNode } from "react";
import { Footer } from "./components/footer";
import { Header } from "./components/header";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="abyss">
      <body className="h-screen flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-hidden">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
