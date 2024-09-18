/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  env: {
    BACKEND_URL: 'http://127.0.0.1:5000',
    NEXTAUTH_SECRET: "shop-access-token"
  }
}

module.exports = nextConfig
