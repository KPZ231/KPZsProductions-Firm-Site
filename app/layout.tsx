import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default:
      "KPZsProductions | Modern Web Development Studio – Next.js, React, Astro",
    template: "%s | Modern Web Development Studio – Next.js, React, Astro",
  },
  description:
    "KPZsProductions to studio tworzące szybkie, nowoczesne i responsywne strony internetowe oparte na technologiach Next.js, React, Astro i Tailwind CSS. Pomagamy markom budować silną obecność w sieci.",
  authors: [{ name: "KPZsProductions" }],
  keywords:
    "tworzenie stron internetowych, projektowanie stron, nowoczesne strony www, strony internetowe Rybnik, strony www Rybnik, web developer Rybnik, agencja webowa Rybnik, studio webowe Rybnik, KPZsProductions, strony firmowe Rybnik, responsywne strony www, profesjonalne strony internetowe, projektowanie stron dla firm, web development, front-end developer, web design, nowoczesne strony internetowe, indywidualne projekty stron, strony z Next.js, strony z React, strony z Astro, Tailwind CSS, szybkie strony internetowe, strony SEO-friendly, optymalizacja stron internetowych, strony pod pozycjonowanie, tworzenie stron z CMS, strony WordPress Rybnik, WordPress WooCommerce, sklepy internetowe Rybnik, projektowanie sklepów online, strony e-commerce, developer stron Rybnik, freelancer web developer",
  publisher: "KPZsProductions",
  alternates: {
    canonical: "./",
  },
  robots: "index,follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <head>
        <link
          rel="shortcut icon"
          href="/Images/favicon.jpg"
          type="image/x-icon"
        />
      </head>
      <body className={`${jetbrainsMono.variable} antialiased`}>
        <Navbar></Navbar>
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}
