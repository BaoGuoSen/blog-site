import { RouteObject } from "react-router-dom";

import Layout from '../layout';
import Author from '../page/manage/author';
import Tag from '../page/manage/tag';
import Article from '../page/manage/article';
import System from '../page/manage/system';

/**
 * 路由配置
 * @see http://react-guide.github.io/react-router-cn/docs/guides/basics/RouteConfiguration.html
 */
const routers: RouteObject[] = [
  {
    path: '/manage',
    element: <Layout />,
    children: [
      {
        path: '/author',
        element: <Author />
      },
      {
        path: '/tag',
        element: <Tag />
      },
      {
        path: '/article',
        element: <Article />
      },
      {
        path: '/system',
        element: <System />
      }
    ]
  }
];

function format(routers: RouteObject[], basePath = ''): RouteObject[] {
  return routers.map(
    ({ path, children, ...rest }) => {
      const nextPath = basePath + path;

      return ({
        ...rest,
        path: nextPath,
        children: children ? format(children, nextPath) : undefined
      });
    }
  );
}

export default format(routers);