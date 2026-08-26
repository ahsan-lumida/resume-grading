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
      // Apex domain must redirect to www — otherwise Google crawls identical
      // content on both hosts and can override our declared canonical
      // (GSC: "Duplicate, Google chose different canonical than user").
      {
        source: "/:path*",
        has: [{ type: "host", value: "resumegrading.com" }],
        destination: "https://www.resumegrading.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
