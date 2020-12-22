const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: { index: './src/index.ts' },
  resolve: { extensions: ['.tsx', '.ts', '.js'] },
  target: 'node',
  output: {
    library: 'umd',
    filename: 'index.js',
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        use: ['babel-loader', 'ts-loader'],
        exclude: '/node_modules/'
      }
    ]
  },
  plugins: [new CleanWebpackPlugin()]
};
