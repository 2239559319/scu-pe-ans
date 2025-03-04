const { join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { DefinePlugin } = require('webpack');
const { renderToString } = require('react-dom/server');

const isProd = process.env.NODE_ENV === 'production';

/**
 * @type {import('webpack').Configuration}
 */
const config = {
  entry: './src/index.ts',
  mode: isProd ? 'production' : 'development',
  output: {
    publicPath: isProd ? './' : '/',
    path: join(__dirname, 'dist'),
    filename: isProd ? '[name].[contenthash:8].js' : '[name].js',
    assetModuleFilename: isProd ? '[name].[contenthash:8].js' : '[name].js',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?/,
        use: 'ts-loader',
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.less$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
      },
    ],
  },
  performance: {
    maxAssetSize: 50000000,
    maxEntrypointSize: 5000000,
  },
  devtool: isProd ? false : 'source-map',
  cache: isProd
    ? false
    : {
        type: 'filesystem',
      },
  plugins: [
    new HtmlWebpackPlugin({
      template: join(__dirname, 'public', 'index.ejs'),
      templateParameters: {
        content: isProd ? renderToString(require('./cjs/App').default) : '',
      },
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css',
    }),
    new DefinePlugin({
      '__PROD__': JSON.stringify(isProd ? true : false),
    })
  ],
  devServer: {
    port: 9000,
    hot: true,
  },
};

module.exports = config;
