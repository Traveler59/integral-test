const MiniCssWebpackPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: [MiniCssWebpackPlugin.loader, 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [MiniCssWebpackPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/',
          },
        }],
      },
    ],
  },
  plugins: [
    new MiniCssWebpackPlugin({ filename: 'bundle.css' }),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'css', 'bootstrap.min.css'),
        to: path.join(__dirname, 'style-libs', 'bootstrap.min.css'),
      },
      {
        from: path.join(__dirname, 'node_modules', 'react-day-picker', 'lib', 'style.css'),
        to: path.join(__dirname, 'style-libs', 'react-day-picker.css'),
      },
    ]),
  ],
};
