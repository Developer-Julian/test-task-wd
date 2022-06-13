module.exports = {
  stories: [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)",
    "../src/**/*.stories.ts",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-jest",
    "@storybook/addon-a11y",
  ],
  core: {
    builder: "webpack5",
  },
  webpackFinal: async (config) => {
    if (!config.resolve.fallback) {
      config.resolve.fallback = {};
    }
    config.resolve.fallback.crypto = false;
    return config;
  },
};
