"use client";

import { useEffect } from "react";
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
  title: "Juego Chocolate",
  description: "Experiencia promocional",
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

  useEffect(() => {
    let lastTouchEnd = 0;

    const preventDoubleTap = (e: TouchEvent) => {
      const now = Date.now();

      if (now - lastTouchEnd <= 300) {
        e.preventDefault();
      }

      lastTouchEnd = now;
    };

    const preventGesture = (e: Event) => {
      e.preventDefault();
    };

    document.addEventListener("touchend", preventDoubleTap, { passive: false });
    document.addEventListener("gesturestart", preventGesture);
    document.addEventListener("gesturechange", preventGesture);
    document.addEventListener("gestureend", preventGesture);

    return () => {
      document.removeEventListener("touchend", preventDoubleTap);
      document.removeEventListener("gesturestart", preventGesture);
      document.removeEventListener("gesturechange", preventGesture);
      document.removeEventListener("gestureend", preventGesture);
    };
  }, []);

  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      style={{
        height: "100%",
        overflow: "hidden",
      }}
    >
      <body
        className="min-h-full flex flex-col"
        style={{
          height: "100%",
          overflow: "hidden",
          touchAction: "manipulation",
          overscrollBehavior: "none",
        }}
      >
        {children}
      </body>
    </html>
  );
}