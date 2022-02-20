import {Configuration} from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from 'path';

const config: Configuration = {
  mode: 'development',
  entry: './src/entry.tsx',
  devtool: false,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  // externals: ['react', 'react-dom'],
  module: {
    rules: [
      {
        test: /.pcss$/,
        use: [MiniCssExtractPlugin.loader,  'css-loader', 'postcss-loader']
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      }]
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new MiniCssExtractPlugin()
  ],
  optimization: {
    minimizer : [
      '...',
      new CssMinimizerPlugin()
    ]
  }
}

export default config;
