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

export const metadata: Metadata = {
  title: "Juego Chocolate",
  description: "Experiencia promocional",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  // BLOQUEO DE GESTOS (pinch zoom, doble tap)
  const blockGestures = (e: any) => {
    if (e.touches && e.touches.length > 1) {
      e.preventDefault();
    }
  };

  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable}`}
      style={{
        height: "100%",
        margin: 0,
        padding: 0,
        overflow: "hidden",
      }}
    >
      <body
        onTouchStart={blockGestures}
        onTouchMove={blockGestures}
        onDoubleClick={(e) => e.preventDefault()}
        style={{
          height: "100dvh",
          width: "100vw",
          margin: 0,
          padding: 0,
          overflow: "hidden",
          touchAction: "none", // bloquea gestos
          overscrollBehavior: "none",
          WebkitUserSelect: "none",
          userSelect: "none",
          background: "#fff7e6",
        }}
      >
        {children}
      </body>
    </html>
  );
}