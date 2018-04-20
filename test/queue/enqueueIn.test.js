'use strict';

var expect = require('chai').expect;
var _  = require('lodash');
var sinon = require('sinon');

/* jshint maxlen: false */
describe('Queue - enqueueIn :: ', function () {

  it('resque.queue should exist', function () {
    expect(sails.resque.queue).to.be.an('object');
  });

  it('should enqueue a task', async function () {
      await sails.resque.queue.enqueueIn(500, 'math', 'add', [5, 6]);

      // wait some time for the queue
      await new Promise((r) => setTimeout(r, 505));

      const length = await sails.resque.queue.length('math');
      expect(length).to.be.eq(1);

  });

  after(async () => {
    await sails.resque.queue.del('math', 'add', [5, 6]);
  });

});
