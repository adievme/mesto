const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/pages/index.js',
  target: 'es5',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  mode: 'development',
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    compress: true,
    port: 8080,

    open: true 
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader, 
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'postcss-loader'
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff2?)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false
            }
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin()
  ],
}