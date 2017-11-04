const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const devServer = require('./webpack/dev-server');
const build = require('./webpack/build');
const production = require('./webpack/production');
const SassLintPlugin = require('sasslint-webpack-plugin');

const common = {
  entry: {
    index: [
      'react-hot-loader/patch',
      path.join(__dirname, 'dev/index/index.jsx'),
    ],
  },

  resolve: {
    extensions: ['.webpack.js', '.web.js', '.js', '.json', '.jsx'],
    alias: {
      scss: path.resolve(__dirname, 'dev/scss'),
      img: path.resolve(__dirname, 'dev/img'),
    },
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
          'eslint-loader',
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
        exclude: /(fonts|sprite-src|favicon)/,
        options: {
          outputPath: 'img/',
          name: '[name].[ext]',
        },
      },

      {
        test: /\.(jpe*g|png|gif|svg)$/,
        loader: 'file-loader',
        include: /favicon.png/,
        options: {
          outputPath: '/',
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
    new SassLintPlugin({
      configFile: '.sass-lint.yml',
      glob: 'dev/**/*.s?(a|c)ss',
      ignoreFiles: [
        path.resolve(__dirname, 'dev/scss/sprite-svg.scss'),
        path.resolve(__dirname, 'dev/scss/sprite-tmpl.scss'),
      ],
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
