const HtmlWebPackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
   entry: './src/index.js',
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'main.js',
      publicPath: './'
   },
   target: 'web',
   mode: 'development',
   devtool: 'source-map',
   module: {
      rules: [
         {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
               loader: 'babel-loader',
               options: {
                  presets: ['@babel/preset-env', '@babel/preset-react']
               }
            }  
         },
         {
            test: /\.s[ac]ss$/i,
            use: [
               "style-loader",
               "css-loader",
               "sass-loader",
            ],
         },
         {
            test: /\.(png|j?g|svg|gif)?$/,
            use: 'file-loader'
         }
      ]
   },
   plugins: [
      new HtmlWebPackPlugin({
         title: "Form Post",
         template: './public/index.html',
         filename: 'index.html'
      })
   ],
   optimization: {
      minimize: true,
      minimizer: [
         new TerserPlugin({
            parallel: true,
         }),
      ],
   },
   target: 'node',
};