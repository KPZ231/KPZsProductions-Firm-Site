import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Analytics } from "@vercel/analytics/next";


const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: {
    default:
      "Tworzenie Stron Internetowych Next.js, React & Astro | KPZsProductions",
    template: "%s | KPZsProductions – Studio Webowe",
  },
  description:
    "Profesjonalne tworzenie stron internetowych i sklepów online. Szybkie, responsywne strony www z Next.js, React i Astro. SEO-friendly projektowanie stron dla firm – sprawdź ofertę studio webowego KPZsProductions.",
  authors: [{ name: "KPZsProductions" }],
  keywords:
    "tworzenie stron internetowych, projektowanie stron, nowoczesne strony www, studio webowe, agencja webowa, KPZsProductions, strony firmowe, responsywne strony www, profesjonalne strony internetowe, projektowanie stron dla firm, web development, front-end developer, web design, indywidualne projekty stron, strony z Next.js, strony z React, strony z Astro, Tailwind CSS, szybkie strony internetowe, strony SEO-friendly, optymalizacja stron internetowych, strony pod pozycjonowanie, tworzenie stron z CMS, strony WordPress, WordPress WooCommerce, sklepy internetowe, projektowanie sklepów online, strony e-commerce, freelancer web developer",
  publisher: "KPZsProductions",
  alternates: {
    canonical: "https://www.kpzsproductions.pl/",
  },
  robots: "index,follow",
  openGraph: {
    title: "Tworzenie Stron Internetowych – Studio Webowe KPZsProductions",
    description: "Profesjonalne strony internetowe i sklepy online z Next.js, React i Astro. Responsywne, szybkie i SEO-friendly projekty dla firm.",
    url: "https://www.kpzsproductions.pl/",
    siteName: "KPZsProductions",
    images: [
      {
        url: "https://www.kpzsproductions.pl/Images/kpz.jpg",
        width: 1200,
        height: 630,
        alt: "KPZsProductions - Studio Webowe",
      },
    ],
    locale: "pl_PL",
    type: "website",
  },
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

        {/* Schema.org - Organization */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "KPZsProductions",
              "url": "https://www.kpzsproductions.pl/",
              "logo": "https://www.kpzsproductions.pl/Images/kpz.jpg",
              "description": "Studio webowe specjalizujące się w tworzeniu profesjonalnych stron internetowych z Next.js, React i Astro",
              "sameAs": [
                "https://www.facebook.com/61583906726908/",
                "https://www.instagram.com/kpzsproductions/"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "Customer Service",
                "availableLanguage": ["Polish"]
              },
              "offers": {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Tworzenie stron internetowych",
                  "description": "Profesjonalne projektowanie i tworzenie responsywnych stron internetowych i sklepów online"
                }
              }
            }
          `}
        </script>

        {/* Schema.org - WebSite */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "KPZsProductions",
              "url": "https://www.kpzsproductions.pl/",
              "description": "Profesjonalne tworzenie stron internetowych z Next.js, React i Astro",
              "publisher": {
                "@type": "Organization",
                "name": "KPZsProductions"
              }
            }
          `}
        </script>
      </head>
      <body className={`${jetbrainsMono.variable} antialiased`}>
        <Navbar></Navbar>
        {children}
        <Analytics />
        <Footer></Footer>
      </body>
    </html>
  );
}
