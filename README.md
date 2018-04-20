# sails-hook-resque
[![Build Status](https://travis-ci.org/edy/sails-hook-resque.svg)](https://travis-ci.org/edy/sails-hook-resque)

Delayed tasks in Sails.js app. Using node-resque

## Configuration
All configuration options are available in [lib/defaults.js](lib/defaults.js)

## Queue usage
Hook setup queue service in your Sails.js application

Your Sails.js application will contain `sails.resque.queue` object that is [NR.queue](https://github.com/taskrabbit/node-resque#queue-management) and have all it's methods.

**Usage in application** In your application:

Create a task in `api/jobs/add.js` :

```javascript
module.exports = {
  plugins: [ 'JobLock' ],
  pluginOptions: {
    jobLock: {},
  },
  perform: async (a, b) => {
    const answer = a + b;
    await new Promise((r) => setTimeout(r, 1000));
    return answer;
  },
};
```

And queue it in your application:
```javascript
sails.resque.queue.enqueue('math', 'add', [1, 2]);
```
