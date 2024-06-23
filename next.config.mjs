/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'unilib-storage.storage.yandexcloud.net',
      port: ''
    },
  {
    protocol: 'https',
    hostname: 'stellard.ru',
    port: ''
  }]
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  }
};

export default nextConfig;
