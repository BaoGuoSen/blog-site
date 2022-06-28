import type { User } from './types';
import type { Params } from 'ahooks/lib/usePagination/types';

import { message } from 'antd';

import request from '../../utils/http';

const getUsers = async (pageParams: Params[0], params: { id: string; }) => {
  const { data } = await request<{ list: User[], total: number }>('api/user/list', {
    ...params,
    ...pageParams
  });
  // {list: [], total: 0}
  return data;
};

async function addUser(params: Omit<User, 'id' | 'createdAt'>) {
  const { msg } = await request<null>('api/user/add', params);

  message.success(msg);
}

async function deleteUser(params: Pick<User, 'id'>) {
  const { msg } = await request<null>('api/user/delete', params);

  message.success(msg);
}

async function updateUser(params: Omit<User, 'createdAt'>) {
  const { msg } = await request<null>('api/user/update', params);

  message.success(msg);
}

async function getAllUser() {
  const { data: { list } } = await request<{ list: Pick<User, 'id' | 'name'>[] }>('api/user/all');

  return list;
}

async function getUserCard(params: Pick<User, 'id'>) {
  const { data } = await request<User & { totalViewCount: number; }>('api/user/card', params);

  return data;
}

export { getUsers, addUser, deleteUser, updateUser,
  getAllUser, getUserCard };