'use strict';

var expect = require('chai').expect;
var _  = require('lodash');
var sinon = require('sinon');

/* jshint maxlen: false */
describe('Queue - enqueueIn :: ', function () {

  it('resque.queue should exist', function () {
    expect(sails.resque.queue).to.be.an('object');
  });

  it('should enqueue a task', async function (done) {
    try {
      const enqueued = await sails.resque.queue.enqueueIn(500, 'math', 'add', [1, 2]);
      const length = await sails.resque.queue.length('math');
      expect(length).to.be.eq(1);
      done();
    } catch (err) {
      expect(err).to.not.exist;
      done(err);
    }
  });

});
