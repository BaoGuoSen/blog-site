import type { TableColumnProps } from 'antd'
import type { Tag as TagType } from '@/service/tag/types'
import type { IComponentsConfig } from '@/utils/createForm/types'

import { Tag } from 'antd'

import Upload from '@/components/Upload'
import { upload } from '@/service/common'
import randomTagColor from '@/utils/randomTagColor'

const colums: TableColumnProps<TagType>[] = [
  {
    title: 'id',
    dataIndex: 'id'
  },
  {
    title: '名称',
    dataIndex: 'name',
    render: (_, { name }) => <Tag color={randomTagColor()}>{name}</Tag>
  },
  {
    title: '阅读量',
    dataIndex: 'viewCount',
    render: (_, { viewCount = 0 }) => viewCount.toLocaleString()
  }
]

const searchBarFields = [{ label: '名称', name: 'name' }]

const drawerFormComponents: IComponentsConfig = [
  { label: '名称', name: 'name' },
  {
    label: 'ICON',
    name: 'icon',
    require: false,
    element: <Upload request={(file) => upload({ file })} />
  }
]

export { colums, searchBarFields, drawerFormComponents }
