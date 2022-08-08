import type { TableColumnProps } from 'antd'
import type { Tag } from '@/service/tag/types'

import { useAntdTable } from 'ahooks'
import SearchBar from '@/components/SearchBar'
import { Form, Button, Space, Popconfirm } from 'antd'

import styles from './index.module.less'
import TagDrawerContent from './DrawerContent'
import SafeTable from '@/components/SafeTable'
import useFormDrawer from '@/hooks/useFormDrawer'
import { getTags, deleteTag } from '@/service/tag'
import { colums, searchBarFields } from './staticModel'

const Index = () => {
  const [form] = Form.useForm()
  const { Drawer, openDrawer } = useFormDrawer()
  const {
    tableProps,
    search: { submit, reset },
    loading
  } = useAntdTable(getTags, { form })

  const deleteAuthor = async (id: number) => {
    await deleteTag({ id })
    reset()
  }

  // 新增 or 更新标签
  const onAddOrUpdateClick = (data?: Tag) => {
    openDrawer({
      width: 500,
      title: data ? '更新标签' : '添加标签',
      content: <TagDrawerContent data={data} />,
      refresh: reset
    })
  }

  const columns: TableColumnProps<Tag>[] = [
    ...colums,
    {
      title: '操作',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => onAddOrUpdateClick(record)}>Update</a>
          <Popconfirm
            title="确定删除这个标签吗?"
            onConfirm={() => deleteAuthor(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <a>Delete</a>
          </Popconfirm>
        </Space>
      )
    }
  ]

  return (
    <div className={styles.container}>
      <h2>标签管理</h2>
      <div className={styles.search}>
        <SearchBar
          form={form}
          onReset={reset}
          onSearch={submit}
          loading={loading}
          fields={searchBarFields}
        />
      </div>

      <div className={styles['add-btn']}>
        <Button onClick={() => onAddOrUpdateClick()} type="primary">
          添加标签
        </Button>
      </div>

      <SafeTable columns={columns} rowKey="id" {...tableProps} />
      {Drawer}
    </div>
  )
}

export default Index
