const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const { DefinePlugin } = require('webpack')

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
    hot: true,
    port: 4200, // port 4200 is whitelisted by the backend
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
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: 'index.html',
    }),
    new Dotenv(),
    new DefinePlugin({ 'process.env.BUILD_MODE': JSON.stringify(process.env.BUILD_MODE) }),
  ],
  resolve: {
    alias: {
      react: path.resolve('./node_modules/react'),
      'cap-shared-components': path.resolve('./cap-shared-components'),
    },
    extensions: ['.jsx', '.js'],
  },
}
