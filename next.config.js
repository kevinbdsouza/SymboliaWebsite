/** @type {import('next').NextConfig} */
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig

export default {
  // your existing config
};

initOpenNextCloudflareForDev();