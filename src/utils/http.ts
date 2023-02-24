/* eslint-disable @typescript-eslint/no-explicit-any */
import { extend } from 'umi-request'

import { message } from 'antd'

import { baseUrl } from '../config'
import { ResBasic } from './types'

// 响应code异常处理程序
const request = extend({
  timeout: 30 * 1000,
  timeoutMessage: '网络超时'
})

request.interceptors.request.use((url: string, options: any) => {
  return { url: baseUrl + url, options }
})

request.interceptors.response.use(async (response) => {
  return response
})

async function betterRequest<R>(
  url: string,
  params?: Record<string, any>,
  file?: FormData
) {
  try {
    const {
      data,
      code,
      msg = '系統繁忙'
    } = await request<Promise<ResBasic<R>>>(url, {
      method: 'POST',
      headers: {
        code: localStorage.getItem('code') || ''
      },
      data: file || params,
      requestType: file ? 'form' : 'json'
    })

    if (code !== 200) {
      message.error(msg)
      throw new Error(msg)
    }

    return { data, msg }
  } catch (error) {
    const errMsg = (error as Error).message

    // 错误提示
    // 继续抛出错误, 为了终止之后的Promise处理进程
    throw new Error(errMsg)
  }
}

export default betterRequest
