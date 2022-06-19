const colors = require('colors-console');
const mockApi = require('../mock');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

Object.keys(mockApi).forEach(item => {
  const [method, url] = item.split(' ');

  app[method](url, mockApi[item]);
})

//配置服务端口
const server = app.listen(4000, function () {
  const port = server.address().port;

  console.log(`\n> Mock Server App listening at: ${colors('green', 'http://localhost:%s')}`, port);
});