const path = require('path')

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
      test: /\.svg$/i,
      use: [
        { loader: 'svg-inline-loader' }
      ]
    })

    config.resolve.extensions.push('.json', '.jsx')
  }
}
