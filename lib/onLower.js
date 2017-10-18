'use strict';

module.exports = function(sails) {

  return function onLower() {
    if (sails.resque.queue) {
      sails.resque.queue.end(function() {});
    }
    if (sails.resque.worker) {
      sails.resque.worker.end(function() {});
    }
    if (sails.resque.scheduler) {
      sails.resque.scheduler.end(function() {});
    }
  };
};
