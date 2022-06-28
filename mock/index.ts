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
          viewCount: '@integer(100, 1000)',
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

  'post /api/user/card'(_, res) {
    const { data } = Mock.mock({
      'data': {
        name: '@name',
        avatar: 'https://ant-centerjr-public-dev-001.oss-cn-shanghai.aliyuncs.com/cigarette_saas/common/20220304/1646373036650%E4%B8%8B%E8%BD%BD.jpeg?Expires=1961992236&OSSAccessKeyId=LTAI5tQpZFuhYemmGjuce6pM&Signature=xcHkFC7KFJjuJulQPtaEos3A%2F8M%3D',
        desc: '很多我们认为荒谬的事情, 正在变为现实',
        'totalViewCount|100-10000': 1,
        email: '744765302@qq.com',
        github: 'https://github.com/STTTOS'
      }
    });

    setTimeout(() => {
      res.json({
        code: 200,
        data
      });
    }, 230);
  },
 'post /api/article/similar'(_, res) {
    const { list } = Mock.mock({
      'list|5': [{
        id: '@id',
        title: '@cword(10,25)',
        'viewCount|100-10000': 1,
        'readingTime|2-15': 1
      }]
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

  'post /api/article/detail': (req, res) => {
    const { detail } = Mock.mock({
      'detail': {
        id: '@id',
        title: '@title',
        desc: '@string'
      }
    });

    detail.content = `# test`

    setTimeout(() => {
      res.json({
        code: 200,
        data: detail
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