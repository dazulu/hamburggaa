/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  generateBuildId: () => "build",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.ctfassets.net",
        port: "",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

module.exports = nextConfig;
