import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import Navbar from "./components/Navbar";
import Hero from "./components/HeroSection";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "KPZsProductions | Creative Web Development Studio",
    template: "%s | KPZsProductions",
  },
  description:
    "Modern web studio crafting fast, responsive websites using Next.js, WordPress, and WooCommerce for growing brands.",
  authors: [{ name: "KPZsProductions" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jetbrainsMono.variable} antialiased`}>
        {children}
        
      </body>
    </html>
  );
}
