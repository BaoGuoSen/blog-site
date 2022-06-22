import type { User } from './types';
import type { Params } from 'ahooks/lib/usePagination/types';

import request from '../../utils/http';

const getUsers = async (pageParams: Params[0], params: { id: string; }) => {
  const { data } = await request<{ list: User[], total: number }>('api/user/list', {
    ...params,
    ...pageParams
  });
  // {list: [], total: 0}
  return data;
};

export { getUsers };