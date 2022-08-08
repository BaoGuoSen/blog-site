import type { MenuProps } from 'antd'

import {
  TagsOutlined,
  FileOutlined,
  SettingOutlined,
  UserOutlined,
  ToolOutlined
} from '@ant-design/icons'

type MenuItem = Required<MenuProps>['items'][number]

const menuItems: MenuItem[] = [
  {
    key: 'author',
    label: '作者管理',
    icon: <UserOutlined />
  },
  {
    key: 'tag',
    label: '标签管理',
    icon: <TagsOutlined />
  },
  {
    key: 'article',
    label: '文章管理',
    icon: <FileOutlined />
  },
  {
    key: 'tool',
    label: '工具管理',
    icon: <ToolOutlined />
  },
  {
    key: 'system',
    label: '系统管理',
    icon: <SettingOutlined />
  }
]

export default menuItems
