const path = require('path')

const context = path.resolve(process.cwd(), 'resources')

module.exports = (config, isPluginCommand) => {
  if (!isPluginCommand) {
    config.context = context
    config.resolve.extensions.push('.json', '.jsx')
    config.resolve.modules.push(context)
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
  }
}
