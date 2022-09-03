import type { User, Login } from './types'
import type { Params } from 'ahooks/lib/usePagination/types'

import { message } from 'antd'
import Cookies from 'js-cookie'
import { SHA256 } from 'crypto-js'

import request from '../../utils/http'

// 登录
async function login(params: Login) {
  const { username, password } = params
  const { data: { token }, msg } = await request<{ token: string }>('api/user/signin', {
    username,
    // 密码：密文传递
    password: SHA256(password).toString()
  })
  // 存 cookie
  Cookies.set('token', token, { expires: 90 })
  message.success(msg)
}

// 获取用户信息
async function getUser() {
  const { data } = await request<User>('api/user/info')
  return data
}

const getUsers = async (pageParams: Params[0], params: { id: string }) => {
  const { data } = await request<{ list: User[]; total: number }>(
    'api/user/list',
    {
      ...params,
      ...pageParams
    }
  )
  // {list: [], total: 0}
  return data
}

async function addUser(params: Omit<User, 'id' | 'createdAt'>) {
  const { msg } = await request<null>('api/user/add', params)

  message.success(msg)
}

async function deleteUser(params: Pick<User, 'id'>) {
  const { msg } = await request<null>('api/user/delete', params)

  message.success(msg)
}

async function updateUser(params: Omit<User, 'createdAt'>) {
  const { msg } = await request<null>('api/user/update', params)

  message.success(msg)
}

async function getAllUser() {
  const {
    data: { list }
  } = await request<{ list: Pick<User, 'id' | 'name'>[] }>('api/user/all')

  return list
}

async function getUserCard(params: Pick<User, 'id'>) {
  const { data } = await request<User & { totalViewCount: number }>(
    'api/user/card',
    params
  )

  return data
}

async function getUsersByRecommend() {
  const {
    data: { list }
  } = await request<User & { list: User[] }>('api/user/recommend', {})

  return list
}

export {
  login,
  getUser,
  getUsers,
  addUser,
  deleteUser,
  updateUser,
  getAllUser,
  getUserCard,
  getUsersByRecommend
}
