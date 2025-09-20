/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'assets.aceternity.com'],
  },
  eslint: {
    // Do not block builds on ESLint errors
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;