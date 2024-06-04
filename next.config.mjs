/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dq8dwmysp7hk1.cloudfront.net',
      },
    ],
  },
}

export default nextConfig
