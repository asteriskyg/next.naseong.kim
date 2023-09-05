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
        hostname: `customer-${process.env.NEXT_PUBLIC_STREAM_CODE}.cloudflarestream.com`,
      },
      {
        protocol: 'https',
        hostname: 'cdn.naseong.kim',
      },
    ],
  },
}

module.exports = nextConfig
