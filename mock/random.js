const { Random } = require('mockjs');

Random.extend({
  status: function () {
    const status = ['active', 'completed'];
    return this.pick(status);
  }
})