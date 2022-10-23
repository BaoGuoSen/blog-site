/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
// 封装antd table
// 1. 统一处理表格空值: 默认为: - (empty_default_value)
// 2. 统一处理自适应宽度
// 3. 统一固定操作栏 `{fix: 'right'}`
import type { TableProps } from 'antd'

import React from 'react'
import { Table } from 'antd'

const CellComponent = ({
  children,
  ...props
}: {
  [key: string]: unknown
  children: React.ReactNode[]
  // @ts-ignore Type '{}' is not assignable to type 'ReactNode
}) => <td {...props}>{children[1] ?? '-'}</td>

const SafeTable = <T extends object = any>({
  columns = [],
  scroll,
  isSaveState = false,
  ...props
}: TableProps<T> & { isSaveState?: boolean }) => {
  const onChange = (pagination: any, filters?: any, sorter?: any) => {
    // @ts-ignore An argument for 'extra' was not provided.
    props.onChange(pagination, filters, sorter)

    // 不用保存当前页面表格页码状态
    if (!isSaveState) return

    const hashUrl = window.location.hash

    if (hashUrl.includes('current')) {
      window.history.replaceState(
        '',
        '',
        `${hashUrl.slice(0, hashUrl.length - 1)}${pagination.current}`
      )
      return
    }

    window.history.replaceState(
      '',
      '',
      `${hashUrl}?current=${pagination.current}`
    )
  }

  // chore: 过滤掉title为空的列
  const newColumns = columns
    .filter(({ title }) => title)
    .map(
      ({ title, ...rest }) =>
        ({
          fixed: title === '操作' ? 'right' : undefined,
          title,
          ...rest
        } as const)
    )

  const newScroll = columns.length > 5 ? { x: 1300 } : undefined

  return (
    <Table
      components={{ body: { cell: CellComponent } }}
      columns={newColumns}
      scroll={scroll || newScroll}
      {...props}
      onChange={onChange}
    />
  )
}

export default SafeTable
