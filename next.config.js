/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/genshin/image/upload/sprites/**",
      },
      {
        protocol: "https",
        hostname: "gi.yatta.moe",
        pathname: "/assets/UI/**",
      },
    ],
  },
};

module.exports = nextConfig;
