/**
 * @type {import('@stryker-mutator/api/core').StrykerOptions}
 */
module.exports = {
  mutator: "typescript",
  packageManager: "npm",
  reporters: ["html", "clear-text", "progress", "dashboard"],
  testRunner: "jest",
  transpilers: [],
  coverageAnalysis: "off",
  tsconfigFile: "tsconfig.json",
  mutate: ["src/**/*.ts", "src/**/*.tsx", "!src/**/*.stories.tsx"],
};
