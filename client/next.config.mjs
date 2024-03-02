/** @type {import('next').NextConfig} */

let nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
}

if (process.env.NODE_ENV === "production") {
  nextConfig = {
    ...nextConfig,
    distDir: "../public",
    output: "export",
  }
} else {
  nextConfig = {
    ...nextConfig,
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
  }
}

export default nextConfig
