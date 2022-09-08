const HtmlWebPackPlugin = require( 'html-webpack-plugin' );
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require( 'webpack' );
const path = require( 'path' );

module.exports = {
   entry: './src/index.js',
   output: {
      path: path.resolve( __dirname, 'dist' ),
      filename: 'main.js',
      publicPath: './'
   },
   mode: 'development',
   devtool: 'source-map',
   module: {
      rules: [
         {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: 'babel-loader',
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
   devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      compress: true,
      port: 9000,
    },
   plugins: [
      new webpack.ProvidePlugin({
         "React": "react",
      }),
      new HtmlWebPackPlugin({
         title: "Form Post",
         template: './public/index.html',
         filename: 'index.html'
      })
   ],
   optimization: {
    minimizer: [
        new TerserPlugin({
            test: /\.js(\?.*)?$/i,
        }),
    ]
   },
};