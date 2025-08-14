/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Disable the built-in optimizer to avoid hitting /_next/image in dev environments
    // where the optimizer route may be unavailable or blocked.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig