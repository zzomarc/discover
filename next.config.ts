import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  agentRules: false,
  // Without this, the dev server rejects the HMR WebSocket handshake for
  // any origin other than the one it thinks it's on, which in this sandbox
  // causes the socket to fail (net::ERR_INVALID_HTTP_RESPONSE) and blocks
  // React from ever finishing hydration — every onClick/useState-driven
  // interaction (dialogs, dropdowns, etc.) silently does nothing, even
  // though the exact same code works fine in a production build.
  allowedDevOrigins: ["127.0.0.1", "localhost"],
};

export default nextConfig;
