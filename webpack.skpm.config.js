const path = require('path')

// TODO: Minimize for production
module.exports = (config, isPluginCommand) => {
  config.resolve.modules.push(path.resolve('src'))

  if (!isPluginCommand) {
    config.module.rules.push({
      test: /\.(html)$/i,
      use: [
        { loader: '@skpm/extract-loader' },
        { loader: 'html-loader' }
      ]
    })

    config.module.rules.push({
      test: /\.svg$/,
      loader: 'svg-inline-loader'
    })
  }

  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: 'babel-loader'
  })

  config.resolve.extensions.push('.json', '.jsx', '.ts', '.tsx')
}
