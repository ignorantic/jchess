const webpack = require('webpack');

module.exports = () => ({
  devtool: 'source-map',
  devServer: {
    stats: 'errors-only',
    port: 3000,
    contentBase: 'build',
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.(sass|scss)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          'autoprefixer-loader',
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              include: '[name].css',
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
});
