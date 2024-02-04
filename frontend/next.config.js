/** @type {import('next').NextConfig} */

// if production
const isProd = process.env.NODE_ENV === "production";

const config = isProd
  ? {
      output: "export",
      distDir: "../public",
      reactStrictMode: true,
      images: {
        unoptimized: true,
      },
    }
  : {
      reactStrictMode: true,
      images: {
        unoptimized: true,
      },
      async rewrites() {
        return [
          {
            source: "/api/:path*",
            destination: "http://localhost:3000/api/:path*", // Proxy to Backend
          },
          {
            source: "/users/:path*",
            destination: "http://localhost:3000/users/:path*", // Proxy to Backend
          },
        ];
      },
    };

module.exports = config;
