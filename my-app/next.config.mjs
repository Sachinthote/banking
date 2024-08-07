// next.config.js
const { withSentryConfig } = require('@sentry/nextjs');

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

const sentryWebpackPluginOptions = {
  silent: true, // Suppresses all logs
  org: "sachin-thote", // Replace with your Sentry organization slug
  project: "javascript-nextjs", // Replace with your Sentry project slug
  // Any other options you want to pass
};

module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);
