const Mock = require('mockjs');

/**
 * mock使用文档
 * @see http://mockjs.com/examples.html
 */

module.exports = {
  'post /api/user/list': (req, res) => {
    const { list } = Mock.mock({
      'list|6-20': [
        {
          id: '@id',
          name: '@name',
          avatar: '@url',
          backgroundUrl: '@url',
          desc: '@string',
          createdAt: '@time("yyyy-MM-dd HH:mm:ss")',
          email: '@url',
          github: '@url'
        }
      ]
    });

    setTimeout(() => {
      res.json({
        code: 200,
        data: {
          total: list.length,
          list
        }
      });
    }, 230);
  },

  'post /api/user/all': (req, res) => {
    const { list } = Mock.mock({
      'list|6-20': [
        {
          id: '@id',
          name: '@name',
        }
      ]
    });

    setTimeout(() => {
      res.json({
        code: 200,
        data: {
          list
        }
      });
    }, 230);
  },

  'post /api/tag/list': (req, res) => {
    const { list } = Mock.mock({
      'list|6-20': [
        {
          id: '@id',
          name: '@name',
          viewCount: '@integer(100, 1000)'
        }
      ]
    });

    setTimeout(() => {
      res.json({
        code: 200,
        data: {
          total: list.length,
          list
        }
      });
    }, 230);
  },

  'post /api/tag/all': (req, res) => {
    const { list } = Mock.mock({
      'list|6-20': [
        {
          id: '@id',
          name: '@name'
        }
      ]
    });

    setTimeout(() => {
      res.json({
        code: 200,
        data: {
          list
        }
      });
    }, 230);
  },

  'post /api/article/list': (req, res) => {
    const { list } = Mock.mock({
      'list|6-20': [
        {
          id: '@id',
          title: '@name',
          desc: '@string',
          viewCount: '@integer(60, 100)',
          backgroundUrl: '@url',
          createdAt: '@time("yyyy-MM-dd HH:mm:ss")',
          authorName: '@name',
          authorId: '@id',
          'tags|1-6': [
            {
              id: '@id',
              name: '@string'
            }
          ]
        }
      ]
    });

    setTimeout(() => {
      res.json({
        code: 200,
        data: {
          total: list.length,
          list
        }
      });
    }, 230);
  },

  'post /api/common/auth': (req, res) => {
    const { isPass } = Mock.mock({
      isPass: '@boolean'
    });

    setTimeout(() => {
      res.json({
        code: 200,
        data: {
          isPass
        }
      });
    }, 230);
  },
};