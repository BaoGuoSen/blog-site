/* eslint-disable @typescript-eslint/no-explicit-any */
// 封装antd table
// 1. 统一处理表格空值: 默认为: - (empty_default_value)
// 2. 统一处理自适应宽度
// 3. 统一固定操作栏 `{fix: 'right'}`
import type { TableProps } from 'antd'

import { Table } from 'antd'

const CellComponent = ({
  children,
  ...props
}: {
  [key: string]: unknown
  children: React.ReactNode[]
}) => <td {...props}>{children[1] ?? '-'}</td>

const Index = <T extends object = any>({
  columns = [],
  scroll,
  ...props
}: TableProps<T>) => {
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
    />
  )
}

export default Index
