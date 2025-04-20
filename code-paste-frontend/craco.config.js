const webpack = require('webpack');

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig.resolve.fallback = {
        "stream": require.resolve("stream-browserify"),
        "util": require.resolve("util"),
        "buffer": require.resolve("buffer"),
        "assert": require.resolve("assert"),
        "process": require.resolve("process/browser"), // Важно!  Указывайте process/browser
        "events": require.resolve("events/"),      // Важно!  Указывайте events/
        "crypto": require.resolve("crypto-browserify"),
        "vm": require.resolve("vm-browserify")
      };

    //   webpackConfig.plugins.push(
    //     new webpack.ProvidePlugin({
    //       process: 'process/browser',
    //       Buffer: ['buffer', 'Buffer'],
    //     })
    //   );

      return webpackConfig;
    },
  },
};