/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static-cdn.jtvnw.net',
      },
      {
        protocol: 'https',
        hostname: 'customer-lsoi5zwkd51of53g.cloudflarestream.com',
      },
    ],
  },
}

module.exports = nextConfig
