const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve('dist'),
    publicPath: '/',
  },
  devServer: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
    hot: true,
    port: 4200,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.html$/,
        use: 'html-loader',
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: 'index.html',
    }),
  ],
  resolve: {
    alias: {
      react: path.resolve('./node_modules/react'),
    },
    extensions: ['.jsx', '.js'],
  },
}
