module.exports = {
  presets: [
    [
      '@babel/env',
      {
        targets: { node: 'current' }
      }
    ],
    "@babel/preset-react",
    '@babel/preset-typescript'
  ],
  plugins: ["@babel/plugin-proposal-class-properties"],
  env: {
    production: {
      plugins: ["emotion"],
    },
    development: {
      plugins: [["emotion", { sourceMap: true }]],
    },
  },
}
