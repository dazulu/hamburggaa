/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  generateBuildId: () => 'build',
  experimental: {
    appDir: true,
  },
  swcMinify: true,
  i18n: {
    locales: ['en', 'de'],
    defaultLocale: 'en',
    localeDetection: true,
  },
  images: {
    domains: ['images.ctfassets.net'],
    formats: ['image/avif', 'image/webp'],
  },
};

module.exports = nextConfig;
