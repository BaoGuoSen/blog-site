import { message } from 'antd'

import request from '../../utils/http'

async function confirmAuth(params: { code: string }) {
  const {
    data: { isPass }
  } = await request<{ isPass: boolean }>('api/common/auth', params)
  if (!isPass) {
    message.error('密钥错误，请重新输入')
    throw new Error('auth fail')
  }

  message.success('验证通过')
}

async function upload(params: { file: File }) {
  const formData = new FormData()
  formData.append('file', params.file)

  const {
    data: { url }
  } = await request<{ url: string }>('api/common/upload', {}, formData)
  return url
}

async function countWeb() {
  await request('api/common/webViewCount')
}

async function getCountWeb() {
  const {
    data: { viewCount }
  } = await request<{ viewCount: number }>('api/common/getWebViewCount')

  return viewCount
}

export { confirmAuth, upload, countWeb, getCountWeb }
