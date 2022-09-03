import { IComponent } from '@/utils/createForm/types'

import { Input } from 'antd'

const loginForm: IComponent[] = [
  {
    label: '账户：',
    name: 'username',
    require: true,
    rules: ['word'],
    range: [6, 12],
    placeholder: '请输入账户名'
  },
  {
    label: '密码：',
    name: 'password',
    require: true,
    placeholder: '请输入登录密码',
    element: <Input.Password />
  }
]

export default loginForm
