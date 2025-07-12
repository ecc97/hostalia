import type { Metadata } from "next";
import { montserrat } from "./fonts";
import "./globals.scss";
import Navbar from "@/components/ui/Navbar";
import ThemeManager from "@/themes/ThemeManager";

export const metadata: Metadata = {
  title: "Hostalia",
  description: "Hostalia es una plataforma de alojamientos para viajeros",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${montserrat.variable} ${montserrat.className} antialiased`}
      >
        <ThemeManager />
        {children}
        <Navbar />
      </body>
    </html>
  );
}
