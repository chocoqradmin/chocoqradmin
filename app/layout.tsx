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

// ✅ Metadata SIN viewport (Next 16)
export const metadata: Metadata = {
  title: "Juego Chocolate",
  description: "Experiencia promocional",
};

// ✅ Viewport correcto separado
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
        className="flex flex-col"
        style={{
          height: "100dvh", // 🔥 clave para móviles (evita recortes)
          overflow: "hidden", // sin scroll (tipo app)
          touchAction: "manipulation",
          overscrollBehavior: "none",
        }}
      >
        {children}
      </body>
    </html>
  );
}