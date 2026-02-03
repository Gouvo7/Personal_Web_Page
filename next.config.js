/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true
  },
  basePath: isProd ? '/Personal_Web_Page' : '',
  assetPrefix: isProd ? '/Personal_Web_Page/' : ''
};

module.exports = nextConfig;