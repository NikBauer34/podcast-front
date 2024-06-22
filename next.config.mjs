/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'unilib-storage.storage.yandexcloud.net',
      port: ''
    }]
  },
  eslint: {
    ignoreDuringBuilds: true
  }
};

export default nextConfig;
