/* eslint-disable global-require,import/no-extraneous-dependencies */
module.exports = () => ({
  plugins: [
    require('autoprefixer'),
    require('cssnano')({
      preset: [
        'default',
        {
          discardComments: {
            removeAll: true,
          },
        },
      ],
    }),
  ],
});
