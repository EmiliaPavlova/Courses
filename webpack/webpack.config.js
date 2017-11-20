const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'inline-source-map',
  entry: {
    app: path.resolve(__dirname, './src', './app')
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.pug$/, use: 'pug-loader' },
      { test: /\.ts$/, use: 'awesome-typescript-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
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
    extensions: ['.pug', '.html', '.css', '.js', '.ts']
  },
  devServer: {
    hot: true,
  }
};