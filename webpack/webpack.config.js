const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const rootDir = path.resolve(__dirname, '..');

module.exports = {
  devtool: 'inline-source-map',
  entry: {
    app: path.resolve(rootDir, './src', './main')
  },
  output: {
    path: path.resolve(rootDir, './dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.ts$/, use: 'awesome-typescript-loader' },
      { test: /\.css$/, use: 'raw-loader' },
      { test: /\.html$/, use: 'html-loader' },
      {
        test: /\.(ttf|eot|svg|woff|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]?[hash]'
      }
    }]
  },
  resolve: {
    extensions: ['.js', '.ts']
  },
  devServer: {
    hot: true,
  }
};