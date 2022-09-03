import type { IFormWithDrawer } from '@/hooks/useFormDrawer'
import type { ICreateFormConfig } from '@/utils/createForm/types'

import { SHA256 } from 'crypto-js'
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
    components: drawerFormComponents(data ? 'edit' : 'add')
  }
  const { formStructure, form } = createForm(config)

  const handleFinish = useCallback(async () => {
    const { password, ...rest }: Omit<User, 'id' | 'createdAt'> = await form.validateFields()
    const params = {
      password: SHA256(password).toString(),
      ...rest
    }

    if (data) {
      await updateUser({
        ...params,
        id: data.id
      })

      return
    }

    await addUser(params)
  }, [])

  // 向父组件的提交按钮, 注册`handleFinish`
  useEffect(() => {
    register(handleFinish)
  }, [register, handleFinish])

  return <div>{formStructure}</div>
}

export default AuthorDrawerContent
