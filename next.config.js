/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["res.cloudinary.com", "ui-avatars.com"],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      // Lighthouse'a takılan o polyfill dosyalarını tamamen iptal ediyoruz
      '../build/polyfills/polyfill-module': false,
      'next/dist/build/polyfills/polyfill-module': false,
    };

    return config;
  },
};

module.exports = nextConfig;
