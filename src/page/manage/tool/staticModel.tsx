import type { TableColumnProps } from 'antd'
import type { Tool } from '@/service/tool/types'
import type { IComponentsConfig } from '@/utils/createForm/types'

import Upload from '@/components/Upload'
import { upload } from '@/service/common'

const onlineEditName = '在线编辑器'

const colums: TableColumnProps<Tool>[] = [
  {
    title: '工具名',
    dataIndex: 'title',
    render: (_, { id, title }) => {
      if (title === onlineEditName) {
        return <span style={{ color: '#999' }}>{title}</span>
      }

      return (
        <a target="_blank" href={`/tools/?id=${id}#/`}>
          {title}
        </a>
      )
    }
  }
]

const searchBarFields = [{ label: '工具名', name: 'title' }]

const drawerFormComponents: IComponentsConfig = [
  { label: '工具名', name: 'title' },
  {
    label: 'JS脚本',
    name: 'scriptUrl',
    element: (
      <Upload
        request={(file) => upload({ file })}
        maxCount={5}
        listType="text"
        accept="js"
      />
    )
  },
  {
    label: 'CSS样式文件',
    name: 'cssHref',
    element: (
      <Upload
        request={(file) => upload({ file })}
        maxCount={5}
        listType="text"
        accept="css"
      />
    )
  }
]

export { colums, searchBarFields, drawerFormComponents, onlineEditName }
