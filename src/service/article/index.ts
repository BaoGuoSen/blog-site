import type { Article } from './types';
import type { Params } from 'ahooks/lib/usePagination/types';

import { message } from 'antd';

import request from '../../utils/http';

const getArticles = async (pageParams: Params[0], params: { id: string; }) => {
  const { data } = await request<{ list: Article[], total: number }>('api/article/list', {
    ...params,
    ...pageParams
  });
  // {list: [], total: 0}
  return data;
};

async function addArticle(params: Omit<Article, 'id' | 'createdAt'>) {
  const { msg } = await request<null>('api/article/add', params);

  message.success(msg);
}

async function deleteArticle(params: Pick<Article, 'id'>) {
  const { msg } = await request<null>('api/article/delete', params);

  message.success(msg);
}

async function updateArticle(params: Omit<Article, 'createdAt'>) {
  const { msg } = await request<null>('api/article/update', params);

  message.success(msg);
}

async function getArticleDetail(params: Pick<Article, 'id'>) {
  const { data } = await request<Article>('api/article/detail', params);

  return data;
}

async function getSimilarArticles(params: Pick<Article, 'id'>) {
  const { data: { list } } = await request<{ list: Article[] }>('api/article/similar', params);

  return list;
}

async function countArticle(params: Pick<Article, 'id'>) {
  request<null>('api/article/count', params);
}

export { getArticles, addArticle, deleteArticle,
  updateArticle, getArticleDetail, getSimilarArticles,
  countArticle };