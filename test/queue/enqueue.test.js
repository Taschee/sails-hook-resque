'use strict';

var expect = require('chai').expect;
var _  = require('lodash');
var sinon = require('sinon');

describe('Queue - enqueue :: ', function () {

  it('resque.queue should exist', function () {
    expect(sails.resque.queue).to.be.an('object');
  });

  it('should enqueue a task', async function (done) {
    try {
      const enqueued = await sails.resque.queue.enqueue('math', 'add', [1, 2]);
      console.log('ENQ', enqueued);
      const length = await sails.resque.queue.length(q)
      console.log('LEN', length);
      expect(length).to.be.eq(1);
      done()
    } catch (err) {
      console.error('FEHLER', err)
      expect(err).to.not.exist;
      done(err)
    }
  });

});
