/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  i18n: {
    locales: ['en', 'de'],
    defaultLocale: 'en',
    localeDetection: true,
  },
};

module.exports = nextConfig;
