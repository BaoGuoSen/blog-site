import type { IFormWithDrawer } from '@/hooks/useFormDrawer'
import type { ICreateFormConfig } from '@/utils/createForm/types'

import { useEffect, useCallback } from 'react'

import { Tag } from '@/service/tag/types'
import createForm from '@/utils/createForm'
import { addTag, updateTag } from '@/service/tag'
import { drawerFormComponents } from './staticModel'

type IProps = IFormWithDrawer & { data?: Tag }

const TagDrawerContent: React.FC<IProps> = ({
  register = () => void 0,
  data
}) => {
  const config: ICreateFormConfig = {
    formConfig: {
      layout: 'vertical',
      itemsRequire: true,
      data
    },
    components: drawerFormComponents
  }
  const { formStructure, form } = createForm(config)

  const handleFinish = useCallback(async () => {
    const tag: Omit<Tag, 'id'> = await form.validateFields()

    if (data) {
      await updateTag({ ...tag, id: data.id })
      return
    }

    await addTag(tag)
  }, [])

  // 向父组件的提交按钮, 注册`handleFinish`
  useEffect(() => {
    register(handleFinish)
  }, [register, handleFinish])

  return <div>{formStructure}</div>
}

export default TagDrawerContent
