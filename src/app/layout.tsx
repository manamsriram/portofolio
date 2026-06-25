import type { Metadata } from "next";
import { JetBrains_Mono, Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://srirammannam.dev"),
  title: "Sri Ram Mannam - Software Engineer",
  description: "Graduate Software Engineer specializing in distributed systems, backend/cloud, and SDN. Built 8-service microservice platforms, RAG pipelines, and autonomous trading engines.",
  openGraph: {
    title: "Sri Ram Mannam - Software Engineer",
    description: "Graduate Software Engineer specializing in distributed systems, backend/cloud, and SDN. Built 8-service microservice platforms, RAG pipelines, and autonomous trading engines.",
    url: "https://srirammannam.dev",
    siteName: "Sri Ram Mannam",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sri Ram Mannam - Software Engineer",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sri Ram Mannam - Software Engineer",
    description: "Graduate Software Engineer specializing in distributed systems, backend/cloud, and SDN.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jetbrainsMono.variable} ${playfairDisplay.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}