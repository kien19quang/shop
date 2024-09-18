/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  env: {
    BACKEND_URL: process.env.APP_MODE === 'DEV' ? 'http://127.0.0.1:5000' : 'https://shop.fabuleuse.co',
    NEXTAUTH_SECRET: 'shop-access-token'
  }
}

module.exports = nextConfig
