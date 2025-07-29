/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // This enables static export
  images: {
    unoptimized: true, // Required if you're using next/image
  },
  trailingSlash: true, // GitHub Pages needs this for correct routing
  basePath: "/Stock_Dashboard", // Replace with your repo name
};

module.exports = nextConfig;
