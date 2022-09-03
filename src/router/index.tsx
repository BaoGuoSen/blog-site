import type { FC } from 'react'
import type { RouteObject } from 'react-router-dom'

import Layout from '../layout'
import Login from '@/page/login'
import Tools from '../page/tools'
import Tag from '../page/manage/tag'
import Tool from '../page/manage/tool'
import Person from '@/page/client/person'
import ClientTag from '@/page/client/tag'
import LayoutClient from '../layoutClient'
import Author from '../page/manage/author'
import System from '../page/manage/system'
import ClientHome from '@/page/client/home'
import Article from '../page/manage/article'
import Markdown from '../page/manage/markdown'
import ClientArticle from '@/page/client/article/'
import ClientArticleList from '@/page/client/articleList'
import withTitleAndRedirect from '@/Hoc/withTitleAndRedirect'

export interface MyRoute extends Omit<RouteObject, 'children' | 'element'> {
  element?: FC
  title?: string
  children?: MyRoute[]
  redirect?: string
}
/**
 * 路由配置
 * @see http://react-guide.github.io/react-router-cn/docs/guides/basics/RouteConfiguration.html
 */
const routers: MyRoute[] = [
  {
    path: '/manage',
    element: Layout,
    children: [
      {
        path: '/author',
        element: Author,
        title: '作者管理'
      },
      {
        path: '/tag',
        element: Tag,
        title: '标签管理'
      },
      {
        path: '/article',
        element: Article,
        title: '文章管理'
      },
      {
        path: '/tool',
        element: Tool,
        title: '工具管理'
      },
      {
        path: '/system',
        element: System,
        title: '系统管理'
      },
      {
        path: '/markdown',
        element: Markdown,
        title: '编辑文章'
      },
      {
        path: '/',
        redirect: '/article'
      },
      {
        path: '*',
        redirect: '/article'
      }
    ]
  },
  {
    path: '/',
    element: LayoutClient,
    children: [
      {
        path: '/',
        element: ClientHome
      },
      {
        path: '/article',
        element: ClientArticle
      },
      {
        path: '/article/list',
        element: ClientArticleList
      },
      {
        path: '/tag',
        element: ClientTag
      }
    ]
  },
  {
    path: '/tools',
    element: Tools
  },
  {
    path: '/login',
    element: Login
  },
  {
    path: '/person',
    element: Person
  },
  {
    path: '*',
    redirect: '/'
  }
]

function format(routers: MyRoute[], basePath = ''): RouteObject[] {
  return routers.map(
    ({ path, children, element, redirect, title = '木木记', ...rest }) => {
      const nextPath = basePath + path

      return {
        ...rest,
        path: nextPath,
        children: children && format(children, nextPath),
        element: withTitleAndRedirect({ title, basePath, redirect, element })
      }
    }
  )
}

export default format(routers)
