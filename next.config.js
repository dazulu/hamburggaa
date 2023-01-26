/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  generateBuildId: () => 'build',
  experimental: {
    appDir: true,
  },
  swcMinify: true,
  images: {
    domains: ['images.ctfassets.net'],
    formats: ['image/avif', 'image/webp'],
  },
};

module.exports = nextConfig;
