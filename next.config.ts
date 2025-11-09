import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  i18n: {
    locales: ['pl', 'en'], // Dwa obsługiwane języki
    defaultLocale: 'pl',   // Domyślny język
  },
};

export default nextConfig;
