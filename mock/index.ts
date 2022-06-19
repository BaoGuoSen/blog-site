const Mock = require('mockjs');

/**
 * mock使用文档
 * @see http://mockjs.com/examples.html
 */

module.exports = {
  'post /api/toB/user/list': (req, res) => {
    const { list } = Mock.mock({
      'list|1-10': [
        { id: '@id' }
      ]
    });

    res.json({
      code: 200,
      data: {
        list
      }
    });
  }
};