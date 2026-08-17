import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "ai-resume-grade.vercel.app" }],
        destination: "https://www.resumegrading.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
