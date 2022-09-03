import type { SelectProps } from 'rc-select/lib/Select'
import type { IFormItemProps } from '@/utils/createForm/types'

import { Select, Radio, Input } from 'antd'
import Upload from '@/components/Upload'
import { upload } from '@/service/common'

const { TextArea } = Input

const modelComponents = (
  userOptions: SelectProps['options'],
  tagOptions: SelectProps['options']
): IFormItemProps[] => {
  return [
    {
      label: '添加标签',
      name: 'tagIds',
      require: true,
      element: (
        <Select
          mode="multiple"
          allowClear
          style={{ width: '100%' }}
          placeholder="Please select tags"
          options={tagOptions}
          filterOption={(input, option) => {
            return new RegExp(input, 'i').test((option?.label as string) || '')
          }}
        />
      )
    },
    {
      label: '类型',
      name: 'isOrigin',
      initialValue: true,
      element: (
        <Radio.Group>
          <Radio value={true}>原创</Radio>
          <Radio value={false}>转载</Radio>
        </Radio.Group>
      )
    },
    {
      label: '编辑摘要',
      name: 'desc',
      element: <TextArea showCount maxLength={100} />
    },
    {
      label: '卡片背景',
      name: 'backgroundUrl',
      element: (
        <Upload uploadText="上传封面" request={(file) => upload({ file })} />
      )
    }
  ]
}

export { modelComponents }
