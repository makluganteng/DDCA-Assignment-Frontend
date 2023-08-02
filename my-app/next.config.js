/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  nextConfig,
  images: {
    domains: ["ddac-data.s3.amazonaws.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ddac-data.s3.amazonaws.com/",
        port: "",
        pathname: "/images/*",
      },
    ],
  },
};
