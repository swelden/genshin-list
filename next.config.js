/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com", "api.ambr.top"],
  },
};

module.exports = nextConfig;
