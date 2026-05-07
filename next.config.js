const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.openfoodfacts.org",
      },
    ],
  },
  turbopack: {
    root: path.join(__dirname),
  },
};

module.exports = nextConfig;
