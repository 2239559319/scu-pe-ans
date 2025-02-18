const { join } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { DefinePlugin } = require('webpack');

const isProd = true;

/**
 * @type {import('webpack').Configuration}
 */
const config = {
  entry: './src/App.tsx',
  mode: isProd ? 'production' : 'development',
  target: 'node',
  output: {
    publicPath: isProd ? './' : '/',
    path: join(__dirname, 'cjs'),
    filename: 'App.js',
    library: {
      type: 'commonjs2'
    }
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
    new MiniCssExtractPlugin(),
    new DefinePlugin({
      '__PROD__': JSON.stringify(isProd ? true : false),
    })
  ],
  externals: {
    react: 'react'
  }
};

module.exports = config;
