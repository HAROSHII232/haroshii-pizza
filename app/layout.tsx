import { Nunito } from "next/font/google";

import "./globals.css";
import { ReactNode } from "react";
import { Metadata } from "next";

const nunito = Nunito({
  subsets: ["cyrillic"],
  variable: "--font-nunito",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "HAROSHII Pizza | Главная",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link data-rh="true" rel="icon" href="/logo.png" />
      </head>
      <body className={nunito.className}>
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
