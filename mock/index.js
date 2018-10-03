const fs = require('fs');
const path = require('path');
const Mock = require('mockjs');

require('./random');

function getData (req, res) {
  const json = fs.readFileSync(path.resolve(__dirname, `./data${req.url}.json`), 'utf-8');
  res.json(Mock.mock(JSON.parse(json)));
}

module.exports = function (app) {
  app.get('/todos', getData)
}