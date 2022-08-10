import type { Tag, TagRes } from './types'
import type { Params } from 'ahooks/lib/usePagination/types'

import { message } from 'antd'

import request from '../../utils/http'

const getTags = async (pageParams: Params[0], params: { id?: string }) => {
  const { data } = await request<{ list: Tag[]; total: number }>(
    'api/tag/list',
    {
      ...params,
      ...pageParams
    }
  )
  // {list: [], total: 0}
  return data
}

async function addTag(params: Omit<Tag, 'id'>) {
  const { msg } = await request<null>('api/tag/add', params)

  message.success(msg)
}

async function deleteTag(params: Pick<Tag, 'id'>) {
  const { msg } = await request<null>('api/tag/delete', params)

  message.success(msg)
}

async function updateTag(params: Tag) {
  const { msg } = await request<null>('api/tag/update', params)

  message.success(msg)
}

async function getAllTag() {
  const {
    data: { list }
  } = await request<{ list: Tag[] }>('api/tag/all')

  return list
}

// 查询全平台tag
async function getTagsByPlatform() {
  const {
    data: { list }
  } = await request<TagRes>('api/tag/view/platform')

  return list
}

// 针对用户个性化查询Tag
async function getTagsByPersonal(params: { authorId: number }) {
  const {
    data: { list }
  } = await request<TagRes>('api/tag/view/personal', params)

  return list
}

export {
  getTags,
  addTag,
  deleteTag,
  updateTag,
  getAllTag,
  getTagsByPlatform,
  getTagsByPersonal
}
