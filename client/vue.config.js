'use strict';

process.env.VUE_APP_VERSION = require('./package.json').version;

module.exports = {
  lintOnSave: process.env.NODE_ENV !== 'production',
  devServer: {
    historyApiFallback: true,
    hot: true,
    noInfo: true,
    overlay: true,
    open: 'firefox-dev'
  },
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = process.env.VUE_APP_TITLE;
      return args;
    });
  }
};
