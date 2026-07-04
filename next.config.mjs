/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // The dev image optimizer stalls on the OneDrive-synced folder, so
    // serve images as-is locally. In production (Vercel) the optimizer
    // runs normally for smaller, responsive images.
    unoptimized: process.env.NODE_ENV === "development",
  },
};

export default nextConfig;
