import type { User } from './types';

import request from '../../utils/http';

const getUsers = async (params: { id: string; }) => {
  const { data: { list } } = await request<{ list: User[] }>('api/toB/user/list', params);
  return list;
};

export { getUsers };