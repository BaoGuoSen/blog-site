import type { TableColumnProps } from 'antd'
import type { User } from '@/service/user/types'
import type { IComponent } from '../../../utils/createForm/types'

import { Avatar, DatePicker, Select, Input, Switch } from 'antd'
import { UserOutlined } from '@ant-design/icons'

import Upload from '@/components/Upload'
import { upload } from '@/service/common'
import Password from 'antd/lib/input/Password'

const colums: TableColumnProps<User>[] = [
  {
    title: '头像',
    dataIndex: 'avatar',
    render: (_, { avatar }) => <Avatar icon={<UserOutlined />} src={avatar} />,
    width: 100
  },
  {
    title: '昵称',
    dataIndex: 'name'
  },
  {
    title: '账户',
    dataIndex: 'username',
  },
  {
    title: '角色',
    dataIndex: 'role',
    render: (_, { role }) => role === 'admin' ? '管理员' : '普通用户'
  },
  {
    title: '个性签名',
    dataIndex: 'desc'
  },
  {
    title: '文章阅读量',
    dataIndex: 'viewCount'
  },
  {
    title: '贡献者',
    dataIndex: 'isContributor',
    render: (_, { isContributor }) => isContributor ? '是' : '否'
  },
  {
    title: 'github',
    dataIndex: 'github',
    render: (_, { github }) =>
      github && (
        <a href={github} target="_blank">
          {github}
        </a>
      )
  },
  {
    title: '邮箱',
    dataIndex: 'email'
  },
  {
    title: '注册时间',
    dataIndex: 'createdAt'
  }
]

const searchBarFields = [
  { label: '昵称', name: 'name' },
  { label: '邮箱', name: 'email' },
  {
    name: 'time',
    label: '注册日期',
    placeholder: ['开始日期', '结束日期'],
    element: <DatePicker.RangePicker style={{ width: '100%' }} />
  }
]

const drawerFormComponents: (type: 'add' | 'edit') => IComponent[] = (type) => {
  return [
    { label: '账户', name: 'username', require: true, element: <Input />, range: [6, 12], rules: ['word'] },
    {
      label: '密码',
      name: 'password',
      range: [6, 18],
      require: type === 'add',
      element: <Password />
    },
    { label: '昵称', name: 'name', require: true },
    { label: '贡献者', name: 'isContributor', element: <Switch />, valuePropName: 'checked' },
    {
      label: '头像',
      name: 'avatar',
      element: <Upload request={(file) => upload({ file })} />
    },
    {
      label: '卡片背景',
      name: 'backgroundUrl',
      element: <Upload request={(file) => upload({ file })} />
    },
    {
      label: '角色',
      name: 'role',
      element: <Select options={[
        { label: '管理员', value: 'admin' },
        { label: '普通用户', value: 'user' }
      ]} />
    },
    { label: '个人签名', name: 'desc' },
    { label: '邮箱', name: 'email' },
    { label: 'github', name: 'github' }
  ]
}
export { colums, searchBarFields, drawerFormComponents }
