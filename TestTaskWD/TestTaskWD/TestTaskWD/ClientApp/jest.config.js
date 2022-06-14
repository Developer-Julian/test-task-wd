require("jest-preset-angular/ngcc-jest-processor");

module.exports = {
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.ts"],
  coverageDirectory: "<rootDir>/coverage/",
  coveragePathIgnorePatterns: [
    "node_modules",
    "test-config",
    "<rootDir>/src/app/interfaces",
    "jestGlobalMocks.ts",
    ".module.ts",
    "<rootDir>/src/main.ts",
  ],
  preset: "jest-preset-angular",
  setupFilesAfterEnv: [
    "<rootDir>/setup-jest.ts",
    "jest-canvas-mock",
    "jest-localstorage-mock",
    "jest-fetch-mock",
    "<rootDir>/setup-tests.js",
  ],
  transformIgnorePatterns: [
    "node_modules/(?!@ngrx|(?!deck.gl)|ng-dynamic)",
    "node_modules/(?!@storybook/*)",
  ],
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/dist/"],
  testEnvironment: "jsdom",
  transform: { "^.+\\.(ts|js|html)$": "jest-preset-angular" },
  globals: {
    "ts-jest": {
      useESM: true,
      tsConfig: "<rootDir>/tsconfig.spec.json",
      stringifyContentPathRegex: "\\.html$",
      diagnostics: true,
      isolatedModules: true,
      astTransformers: [
        "<rootDir>/node_modules/jest-preset-angular/InlineHtmlStripStylesTransformer",
      ],
    },
  },
};
