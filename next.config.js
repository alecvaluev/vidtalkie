/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images:{
    domains: ['tvline.com', 'lh3.googleusercontent.com', 'cdn2.jazztimes.com']
  },
  typescript: {
    ignoreBuildErrora: true,
}

module.exports = nextConfig
