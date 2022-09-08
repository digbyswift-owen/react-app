const HtmlWebPackPlugin = require( 'html-webpack-plugin' );
const TerserPlugin = require('terser-webpack-plugin');
const path = require( 'path' );
const nodeExternals = require('webpack-node-externals');

module.exports = {
   entry: './src/index.js',
   output: {
      path: path.resolve( __dirname, 'dist' ),
      filename: 'main.js',
      publicPath: './'
   },
   mode: 'development',
   target: 'node',
   externals: [nodeExternals()], 
   externalsPresets: {
      node: true
  },
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
};