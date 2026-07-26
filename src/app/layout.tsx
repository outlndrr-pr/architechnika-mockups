import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Architechnika — Architecture with Purpose. Built to Endure.",
  description:
    "Architechnika is an architectural practice in San Juan, Puerto Rico. 45+ years and 300+ projects across hospitality, residential, healthcare, sports, institutional and commercial work.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
