/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Project lives in a OneDrive-synced folder; the dev image optimizer
    // stalls on file locks there. Images are already sensibly sized, so
    // serve them as-is for reliable rendering.
    unoptimized: true,
  },
};

export default nextConfig;
