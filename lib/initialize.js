'use strict';

var _ = require('lodash');
var path = require('path');

/* global sails */
module.exports = function ToInitialize(sails) {

  return async function initialize(cb) {

    // Get application path
    var appPath = sails.config.appPath;
    var config = sails.config[this.configKey];
    config = _.defaults(config, require('./defaults')[this.configKey]);

    var jobsPath = path.resolve(sails.config.appPath, config.jobsPath);

    var jobs = require('include-all')({
      dirname: jobsPath,
      filter: /(.+)\.js$/,
      excludeDirs: /^\.(git|svn)$/,
      optional: true
    });

    // Create an global resque object
    sails.resque = {
      jobs: jobs
    };

    try {
      await require('./init/initWorker')(sails, config, jobs)();
      await require('./init/initScheduler')(sails, config, jobs)();
      await require('./init/initQueue')(sails, config, jobs)();

      sails.log.verbose('sails-hook-resque initialized');

      sails.once('lower', require('./onLower')(sails));
      cb();


    } catch (err) {
      sails.log.error('resque init error.', err);
    }
  };
};
