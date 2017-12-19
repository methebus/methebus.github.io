const webpack = require('webpack'),
      UglifyJsPlugin = require('webpack-uglify-js-plugin'),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      autoprefixer = require('autoprefixer'),
      ExtractTextPlugin = require('extract-text-webpack-plugin'),
      OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'),
      precss = require('precss'),
      path = require('path');

module.exports = {
  entry: "./app/scripts/index.js",
  output: {
    path: __dirname + '/../build',
    filename: "dist/bundle.js"
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          use: 'css-loader?importLoader=1'
        })
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({use: ['css-loader', 'sass-loader']})
      },
      {
        test: /\.(png|jpe?g|ttf|gif|svg)$/,
        loader: 'url-loader'
      }
    ],
    loaders: [
      {
        test: /\.css$/,
        loader: 'css-loader',
        options: {
          minimize: true
        }
      },
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './app/index.html',
      inject: "body"
    }),
    new webpack.optimize.UglifyJsPlugin({minimize: true}),
    new ExtractTextPlugin('dist/styles.css'),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.optimize\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: {discardComments: {removeAll: true}},
      canPrint: true
    })
  ],
}
