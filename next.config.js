/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: false,
  transpilePackages: ['antd'],
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  env: {
    BACKEND_URL: 'http://127.0.0.1:5000',
    NEXTAUTH_SECRET: "shop-access-token"
  }
}

module.exports = nextConfig
