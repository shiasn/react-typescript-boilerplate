import * as Mock from 'mockjs';

(Mock.Random as any).extend({
  status() {
    const status = ['active', 'completed'];
    return this.pick(status);
  }
});
