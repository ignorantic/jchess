const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = () => ({
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(sass|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: { sourceMap: true },
            },
            {
              loader: 'postcss-loader',
              options: { sourceMap: true },
            },
            {
              loader: 'resolve-url-loader',
              options: { sourceMap: true },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                include: '[name].css',
              },
            },
          ],
        }),
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(['build'], {
      root: path.resolve(__dirname, '../'),
      verbose: true,
      dry: false,
    }),

    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true,
    }),
  ],
});
