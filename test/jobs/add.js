'use strict';

module.exports = {
  plugins: ['jobLock'],
  pluginOptions: {
    jobLock: {},
  },
  perform: function(a, b) {
    return a + b;
  },
};
