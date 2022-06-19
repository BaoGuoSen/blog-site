import { RouteObject } from "react-router-dom";

import Layout from '../layout';
import Home from '../page/home';

/**
 * 路由配置
 * @see http://react-guide.github.io/react-router-cn/docs/guides/basics/RouteConfiguration.html
 */
const routers: RouteObject[] = [
  {
    path: '/home',
    element: <Layout />,
    children: [
      {
        path: '/test',
        element: <Home />
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