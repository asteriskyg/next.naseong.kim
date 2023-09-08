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
        hostname: `${process.env.NEXT_PUBLIC_STREAM_HOSTNAME}`,
      },
      {
        protocol: 'https',
        hostname: `${process.env.NEXT_PUBLIC_R2_BUCKET_ID}.r2.dev`,
      },
    ],
  },
}

module.exports = nextConfig
