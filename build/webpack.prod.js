const commonPaths = require('./common-paths');
const fs = require("fs");
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
  filename: "styles/style.[hash].css",
  disable: false,
  allChunks: true
});

const config = {
  name: "production",
  mode: "production",
  entry: {
    app: [`${commonPaths.appEntry}/index.js`]
  },
  output: {
    filename: 'scripts/[name].[hash].js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [ 
            {
              loader: "css-loader",
              options: {
                modules: true,
                importLoaders: 2,
                camelCase: true,
                sourceMap: true,
                minimize: true
              }
            },
            'postcss-loader',
            'sass-loader'
          ]
        })
      },
      {
        test: /global.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [ 
            {
              loader: "css-loader",
              options: {
                modules: false,
                importLoaders: 1,
                camelCase: true,
                sourceMap: true,
                minimize: true
              }
            },
            'postcss-loader',
            'sass-loader'
          ]
        })
      },
      {
        test: /\.scss$/,
        exclude: [/global.scss$/],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
              loader: "css-loader",
              options: {
                modules: true,
                importLoaders: 1,
                camelCase: true,
                sourceMap: true,
                minimize: true
              }
            },
            'postcss-loader',
            'sass-loader'
          ]
        })
      }
    ]
  },
  plugins: [
    extractSass,
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
      'process.env.BROWSER': true
    })
  ]
};

module.exports = config;
