const webpack = require('webpack')
const path = require('path')
require('dotenv').config()
const current_entry = 'EthicManual'

let entry = {}
entry[current_entry.replace('/', '__').replace('__index_', '__')] =
  './src/webapps/' + (current_entry.includes('/') ? current_entry + '.jsx' : current_entry + '/index.js')

module.exports = (env, argv) => {
  const TerserPlugin = require('terser-webpack-plugin')
  const ObfuscatorPlugin = require('webpack-obfuscator')
  let config = {
    entry: entry,
    output: {
      filename: '[name].js',
      path: __dirname + '/dist',
      library: 'webpackLibs'
    },
    resolve: {
      extensions: [ '.tsx', '.ts', '.jsx', '.js' ]
    },
    devtool: false,
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          loader: 'ts-loader'
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            plugins: [ 'lodash' ]
          }
        },
        {
          test: /\.css$/i,
          use: [ 'style-loader', 'css-loader' ]
        },
        {
          test: /\.scss$/i,
          use: [ 'style-loader', 'css-loader', 'sass-loader' ]
        },
        {
          test: /\.svg$/,
          loader: 'react-svg-loader'
        }
      ]
    },
    externals: [
      { react: 'React' },
      {
        'react-dom': 'ReactDOM'
      },
      {
        lodash: {
          commonjs: 'lodash',
          amd: 'lodash',
          root: '_'
        }
      }
    ],
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          parallel: true,
          extractComments: false,
          terserOptions: {
            compress: true,
            ecma: 5,
            mangle: true,
            ie8: false,
            safari10: false,
            output: { comments: false, beautify: false }
          }
        })
      ],
      splitChunks: {
        chunks: 'all'
      }
    },
    plugins: [
      new webpack.SourceMapDevToolPlugin({
        publicPath: 'http://auditbrain.local:8080/webapps/dist/',
        filename: '[file].map'
      }),
      /*new ObfuscatorPlugin({
        compact: true,
        numbersToExpressions: true,
        //domainLock: [ 'auditbrain.local', '.auditbrain.com' ],
        sourceMap: true,
        sourceMapBaseUrl: 'http://auditbrain.local:8080/webapps/dist/'
      })*/
    ]
  }

  return config
}