/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  serverActions: {
    bodySizeLimit: "1gb", // 1 گیگابایت
  },
};

export default nextConfig;
