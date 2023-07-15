/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { domains: ["images.openfoodfacts.org"] },
  typescript: { ignoreBuildErrors: true },
};

module.exports = nextConfig;
