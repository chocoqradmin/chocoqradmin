import type { Metadata, Viewport } from "next";
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

// ✅ Metadata
export const metadata: Metadata = {
  title: "Juego Chocolate",
  description: "Experiencia promocional",
};

// ✅ Viewport (BLOQUEA ZOOM EN CELULAR)
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover", // 🔥 evita bordes negros en móviles
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable}`}
      style={{
        height: "100%",
        margin: 0,
        padding: 0,
        overflow: "hidden", // 🔥 evita scroll global
      }}
    >
      <body
        className="flex flex-col"
        style={{
          height: "100dvh", // 🔥 altura real en móviles
          width: "100vw",   // 🔥 evita espacio negro lateral
          margin: 0,
          padding: 0,
          overflow: "hidden",
          touchAction: "manipulation",
          overscrollBehavior: "none",
          background: "#fff7e6", // 🔥 evita negro al hacer zoom
        }}
      >
        {children}
      </body>
    </html>
  );
}