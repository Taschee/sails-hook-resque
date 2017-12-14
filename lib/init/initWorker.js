'use strict';

var _ = require('lodash');
var NR = require('node-resque');

module.exports = function(sails, config, jobs) {

  /**
   * Initialize Worker to run jobs
   */
  async function initWorker() {
    if (!_.isArray(config.queues)) {
      config.queues = [];
    }

    const worker = new NR.Worker({
      connection: config.connection,
      queues: config.queues
    }, jobs);

    worker.on('error', function (error) {
      sails.log.error(error);
    });

    try {
      await worker.connect()

      if (config.clearQueueOnStartup) {
        // optional: cleanup any previous improperly shutdown workers on this host
        await worker.workerCleanup()
      }

      if (config.autoStart.worker) {
        worker.start();
      }

      sails.resque.worker = worker;
    } catch (err) {
      sails.log.error('sails-hook-resque failed initializing worker.', err);
    }

  }

  return initWorker;
};
