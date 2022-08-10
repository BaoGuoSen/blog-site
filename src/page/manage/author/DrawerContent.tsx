import type { IFormWithDrawer } from '@/hooks/useFormDrawer'
import type { ICreateFormConfig } from '@/utils/createForm/types'

import { useEffect, useCallback } from 'react'

import createForm from '@/utils/createForm'
import { User } from '@/service/user/types'
import { addUser, updateUser } from '@/service/user'
import { drawerFormComponents } from './staticModel'

type IProps = IFormWithDrawer & { data?: User }

const AuthorDrawerContent: React.FC<IProps> = ({
  register = () => void 0,
  data
}) => {
  const config: ICreateFormConfig = {
    formConfig: {
      layout: 'vertical',
      itemsRequire: false,
      data
    },
    components: drawerFormComponents
  }
  const { formStructure, form } = createForm(config)

  const handleFinish = useCallback(async () => {
    const author: Omit<User, 'id' | 'createdAt'> = await form.validateFields()

    if (data) {
      await updateUser({ ...author, id: data.id })

      return
    }

    await addUser(author)
  }, [])

  // 向父组件的提交按钮, 注册`handleFinish`
  useEffect(() => {
    register(handleFinish)
  }, [register, handleFinish])

  return <div>{formStructure}</div>
}

export default AuthorDrawerContent
