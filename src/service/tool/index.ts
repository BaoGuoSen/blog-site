import type { Tool } from './types';
import type { Params } from 'ahooks/lib/usePagination/types';

import { message } from 'antd';

import request from '../../utils/http';

const getTools = async (pageParams: Params[0], params: { id?: string; }) => {
  const { data } = await request<{ list: Tool[], total: number }>('api/tools/list', {
    ...params,
    ...pageParams
  });

  return data;
};

async function addTool(params: Omit<Tool, 'id'>) {
  const { msg } = await request<null>('api/tools/add', params);

  message.success(msg);
}

async function deleteTool(params: Pick<Tool, 'id'>) {
  const { msg } = await request<null>('api/tools/delete', params);

  message.success(msg);
}

async function updateTool(params: Tool) {
  const { msg } = await request<null>('api/tools/update', params);

  message.success(msg);
}

async function getAllTools() {
  const { data: { list } } = await request<{ list: Tool[] }>('api/tools/all');

  return list;
}

export { getTools, addTool, deleteTool, updateTool, getAllTools };