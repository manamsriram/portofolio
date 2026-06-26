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
  metadataBase: new URL(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'),
  title: "Sri Ram Mannam - Software Engineer",
  description: "Graduate Software Engineer specializing in distributed systems, backend/cloud, and SDN. Built 8-service microservice platforms, RAG pipelines, and autonomous trading engines.",
  openGraph: {
    title: "Sri Ram Mannam - Software Engineer",
    description: "Graduate Software Engineer specializing in distributed systems, backend/cloud, and SDN. Built 8-service microservice platforms, RAG pipelines, and autonomous trading engines.",
    url: "https://srirammannam.dev",
    siteName: "Sri Ram Mannam",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sri Ram Mannam - Software Engineer",
    description: "Graduate Software Engineer specializing in distributed systems, backend/cloud, and SDN.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sri Ram Mannam",
  url: "https://srirammannam.dev",
  jobTitle: "Software Engineer",
  alumniOf: { "@type": "CollegeOrUniversity", name: "San Jose State University" },
  knowsAbout: ["Distributed Systems", "Cloud Computing", "Software-Defined Networking", "Backend Engineering"],
  sameAs: [
    "https://github.com/manamsriram",
    "https://linkedin.com/in/srirammannam",
  ],
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}