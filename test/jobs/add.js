'use strict';

module.exports = {
  plugins: ['JobLock'],
  pluginOptions: {
    jobLock: {},
  },
  perform: function(a, b) {
    return a + b;
  },
};
