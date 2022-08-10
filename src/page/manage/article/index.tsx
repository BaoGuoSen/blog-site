import type { TableColumnProps } from 'antd'
import type { Article } from '@/service/article/types'

import { useAntdTable } from 'ahooks'
import SearchBar from '@/components/SearchBar'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Space, Popconfirm } from 'antd'

import styles from './index.module.less'
import SafeTable from '@/components/SafeTable'
import useGlobalData from '@/hooks/useGlobalData'
import { colums, searchBarFields } from './staticModel'
import { deleteArticle, getArticles } from '@/service/article'

const Index = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const {
    tableProps,
    search: { submit, reset },
    loading
  } = useAntdTable(getArticles, { form })
  const { userOptions, tagOptions } = useGlobalData()

  const deleteArticleFn = async (id: number) => {
    await deleteArticle({ id })
    reset()
  }

  const onAddOrUpdateClick = (id?: number) => {
    const url = id ? `/manage/markdown?id=${id}` : '/manage/markdown'

    navigate(url)
  }

  const columns: TableColumnProps<Article>[] = [
    ...colums,
    {
      title: '操作',
      render: (_, { id }) => (
        <Space size="middle">
          <a onClick={() => onAddOrUpdateClick(id)}>Update</a>
          <Popconfirm
            title="确定删除这篇文章吗?"
            onConfirm={() => deleteArticleFn(id)}
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
      <h2>文章管理</h2>
      <div className={styles.search}>
        <SearchBar
          form={form}
          onReset={reset}
          onSearch={submit}
          loading={loading}
          fields={searchBarFields(userOptions, tagOptions)}
        />
      </div>

      <div className={styles['add-btn']}>
        <Button onClick={() => onAddOrUpdateClick()} type="primary">
          添加文章
        </Button>
      </div>

      <SafeTable columns={columns} rowKey="id" {...tableProps} />
    </div>
  )
}

export default Index
