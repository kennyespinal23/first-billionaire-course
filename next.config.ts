import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ['founderoscourse.com', '*.founderoscourse.com'],
    },
  },
}

export default nextConfig
