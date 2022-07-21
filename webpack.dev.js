const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    port: 4200, // port 4200 is whitelisted by the backend
    historyApiFallback: true,
  },
})
