const path = require('path')

const context = path.resolve(process.cwd(), 'src')

module.exports = (config, isPluginCommand) => {
  config.context = context
  config.resolve.modules.push(context)

  if (!isPluginCommand) {
    config.resolve.extensions.push('.json', '.jsx')
    config.module.rules.push({
      test: /\.(html)$/,
      use: [
        { loader: '@skpm/extract-loader' },
        {
          loader: 'html-loader',
          options: {
            attrs: [
              'img:src',
              'link:href'
            ],
            interpolate: true
          }
        }
      ]
    })
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        { loader: 'svg-inline-loader' }
      ]
    })
  }
}
