const { merge } = require('webpack-merge');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const baseConfig = require('./webpack.base.config');

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'inline-cheap-module-source-map',
  // stats: 'errors-only',
  cache: { type: 'filesystem' },
  watchOptions: { ignored: /node_modules/ },
  performance: { hints: 'error' },
  plugins: [new FriendlyErrorsWebpackPlugin()]
});
