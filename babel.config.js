module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
    '@babel/preset-typescript',
    '@emotion/babel-preset-css-prop'
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties'
  ],
  env: {
    dev: {
      presets: [
        [ '@emotion/babel-preset-css-prop', {
          autoLabel: true,
          sourceMap: true
        } ]
      ]
    }
  }
}
