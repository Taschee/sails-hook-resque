'use strict';

const NR = require('node-resque');

module.exports = function(sails, config, jobs) {
  /**
   * Initialize resque queue connection and service
   */
  async function initQueue() {
    sails.log.verbose('sails-hook-resque starting initialize resque queue');
    // Setup resque queue
    const queue = new NR.Queue(
      {
        connection: config.connection
      },
      jobs
    );

    queue.on('error', function(error) {
      sails.log.error(error);
    });

    try {
      await queue.connect();
      sails.resque.queue = queue;
      sails.log.verbose('sails-hook-resque Queue service initalized');
    } catch (err) {
      sails.log.error('sails-hook-resque failed initializing queue.', err);
    }
  }

  return initQueue;
};
