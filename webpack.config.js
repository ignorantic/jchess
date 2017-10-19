const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const devServer = require('./webpack/dev-server');
const build = require('./webpack/build');
const production = require('./webpack/production');


const common = {
  entry: {
    index: path.join(__dirname, 'dev/index/index.jsx'),
  },

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
  },

  module: {
    rules: [

      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'babel-loader',
            options: {
              compact: true,
            },
          },
          // 'eslint-loader',
        ],
      },

      {
        test: /\.(jpe*g|png|gif|svg)$/,
        loader: 'file-loader',
        include: /sprite-src/,
        options: {
          emitFile: false,
        },
      },

      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        loader: 'file-loader',
        include: /fonts/,
        options: {
          outputPath: 'fonts/',
          name: '[name].[ext]',
        },
      },

      {
        test: /\.(jpe*g|png|gif|svg)$/,
        loader: 'file-loader',
        exclude: /(fonts|sprite-src)/,
        options: {
          outputPath: 'img/',
          name: '[name].[ext]',
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      chunks: ['index'],
      template: 'dev/index/index.html',
    }),
  ],
};

module.exports = (env) => {
  if (env === 'production') {
    return merge([
      common,
      production(),
    ]);
  } else if (env === 'build') {
    return merge([
      common,
      build(),
    ]);
  }
  return merge([
    common,
    devServer(),
  ]);
};
