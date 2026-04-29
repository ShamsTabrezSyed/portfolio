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
  title: "Shams Tabrez Syed | Lead AI/ML Engineer",
  description: "Lead AI/ML Engineer specializing in GenAI, MLOps, and real-world AI systems in fintech & healthcare. Building production-grade AI that delivers business value.",
  keywords: ["AI Engineer", "Machine Learning", "GenAI", "RAG", "MLOps", "Fintech AI", "Healthcare AI", "Shams Tabrez Syed"],
  authors: [{ name: "Shams Tabrez Syed" }],
  openGraph: {
    title: "Shams Tabrez Syed | Lead AI/ML Engineer",
    description: "Lead AI/ML Engineer specializing in GenAI, MLOps, and real-world AI systems in fintech & healthcare.",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}