const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  devtool: false,
  target: 'node',
  entry: './dist/src/index.js',
  output: {
    path: path.resolve(__dirname, 'bin'),
    filename: 'index.js'
  },
  resolve: { extensions: ['.ts', '.js'] },
  plugins: [
    new webpack.BannerPlugin({
      banner: '#!/usr/bin/env node\n',
      raw: true
    })
  ]
};
