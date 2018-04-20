'use strict';

var expect = require('chai').expect;
var _  = require('lodash');
var sinon = require('sinon');

describe('Queue - enqueue :: ', function () {

  it('resque.queue should exist', function () {
    expect(sails.resque.queue).to.be.an('object');
  });

  it('should enqueue a task', async function () {
      await sails.resque.queue.enqueue('math', 'add', [1, 2]);
      await sails.resque.queue.enqueue('math', 'add', [3, 4]);
      const length = await sails.resque.queue.length('math')
      expect(length).to.be.eq(2);
  });

  after(async () => {
    // cleanup queue
    await sails.resque.queue.del('math', 'add', [1, 2]);
    await sails.resque.queue.del('math', 'add', [3, 4]);
  });
});
