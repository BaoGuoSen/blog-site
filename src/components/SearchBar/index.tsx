// 统一封装搜索栏
// 1. 自动处理展开/折叠
// 2. 自动处理loading状态
// 3. 支持配置式参数, 比如: `{name: 'xx', label: 'xxx'}`
import type { CurrentStatus, SearchBarProps } from './types'
import type { ICreateFormConfig } from '@/utils/createForm/types'

import { Button } from 'antd'
import { useState, useEffect } from 'react'
import { DownOutlined, UpOutlined } from '@ant-design/icons'

import createForm from '@/utils/createForm'

const Index: React.FC<SearchBarProps> = ({
  fields,
  loading = false,
  countEveryLine = 3,
  onSearch = () => void 0,
  onReset = () => void 0,
  buttonPosition = 'right',
  ...rest
}) => {
  const shouldCollapse = fields.length > countEveryLine
  const [localFields, setLocalFields] = useState(() => {
    if (shouldCollapse) {
      return fields.slice(0, countEveryLine)
    }
    return fields
  })

  // 当前搜索框的状态, 是否已经折叠
  const currentStatus: CurrentStatus =
    localFields.length < fields.length ? 'folded' : 'unfolded'

  const handleClick = () => {
    if (currentStatus === 'folded') {
      setLocalFields(fields)
      return
    }
    setLocalFields(fields.slice(0, countEveryLine))
  }

  const formConfig: ICreateFormConfig = {
    formConfig: {
      onFinish: onSearch,
      // 抵消formItem的底边距
      style: { marginBottom: -24 },
      onReset,
      ...rest
    },
    components: [
      ...localFields.map((config, index) => ({
        span: 24 / countEveryLine,
        ...config,
        // 每行最后一项 消除右边距
        style: { marginRight: (index + 1) % countEveryLine === 0 ? 0 : 32 }
      })),
      {
        autoFit: true,
        noStyle: true,
        element: (
          <div style={{ textAlign: buttonPosition, marginBottom: 24 }}>
            <Button
              htmlType="submit"
              type="primary"
              style={{ marginRight: 10 }}
              loading={loading}
            >
              查询
            </Button>
            <Button htmlType="reset" loading={loading}>
              重置
            </Button>
            {shouldCollapse && (
              <Button type="link" onClick={handleClick}>
                {currentStatus === 'unfolded' ? (
                  <span>
                    折叠
                    <UpOutlined />
                  </span>
                ) : (
                  <span>
                    展开
                    <DownOutlined />
                  </span>
                )}
              </Button>
            )}
          </div>
        )
      }
    ]
  }
  const { formStructure } = createForm(formConfig)

  useEffect(() => {
    if (currentStatus === 'folded') {
      setLocalFields(fields.slice(0, countEveryLine))
      return
    }

    setLocalFields(fields)
  }, [fields])

  return formStructure
}

export default Index
