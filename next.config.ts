import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: this site has no API routes, middleware, or server
  // actions, so it ships as plain static files served by Nginx.
  // See DEPLOYMENT.md.
  output: "export",
};

export default nextConfig;
