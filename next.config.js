/** @type {import('next').NextConfig} */
/*eslint-env node*/
const nextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com", "cdn.buymeacoffee.com"],
  },
  experimental: {
    serverActions: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.node/,
      use: "raw-loader",
    });
    config.resolve.extensionAlias = {
      ".js": [".ts", ".tsx", ".js", ".jsx"],
      ".mjs": [".mts", ".mjs"],
      ".cjs": [".cts", ".cjs"],
    };

    return config;
  },
};

module.exports = nextConfig;
