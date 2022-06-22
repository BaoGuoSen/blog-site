import type { IFormWithDrawer } from '@/hooks/useFormDrawer';
import type { ICreateFormConfig } from '@/utils/createForm/types';

import { useEffect, useCallback } from 'react';

import Upload from '@/components/Upload';
import createForm from '@/utils/createForm';
import { User } from '@/service/user/types';

type IProps = IFormWithDrawer & { data?: User}

const AuthorDrawerContent: React.FC<IProps> = ({ register = () => void 0, data }) => {

  const config: ICreateFormConfig = {
    formConfig: {
      layout: 'vertical',
      itemsRequire: false,
      data
    },
    components: [
      { label: '昵称', name: 'name', require: true },
      { label: '头像', name: 'avatar', element: <Upload /> },
      { label: '卡片背景', name: 'backgroundUrl', element: <Upload /> },
      { label: '个人签名', name: 'desc' },
      { label: '邮箱', name: 'email' },
      { label: 'github', name: 'github' }
    ]
  };
  const { formStructure, form } = createForm(config);

  const handleFinish = useCallback(async () => {
    const author: Omit<User, 'id' | 'createTime'> = await form.validateFields();
    // const service = () => {
    //   if (data) return updateAuthor;
    //   return addAuthor
    // }();

    // await service();
    author;
  }, []);

  // 向父组件的提交按钮, 注册`handleFinish`
  useEffect(() => {
    register(handleFinish);
  }, [register, handleFinish]);

  return <div>{formStructure}</div>;
};

export default AuthorDrawerContent;