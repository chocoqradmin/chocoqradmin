import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ChocoQR",
  description: "Juega, rompe el chocolate y descubre tu premio con ChocoQR",

  // FAVICON (usa tu imagen)
  icons: {
    icon: "/images/choco.avif",
  },

  // BLOQUEO DE ZOOM (correcto)
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
        className="min-h-full flex flex-col"
        style={{
          overflow: "hidden",
          touchAction: "manipulation", // evita doble tap zoom sin romper clicks
          overscrollBehavior: "none",
        }}
      >
        {children}
      </body>
    </html>
  );
}