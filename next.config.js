/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com", "upload-os-bbs.mihoyo.com"],
  },
};

module.exports = nextConfig;
