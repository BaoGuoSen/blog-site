import type { IFormWithDrawer } from '@/hooks/useFormDrawer';
import type { ICreateFormConfig } from '@/utils/createForm/types';

import { useEffect, useCallback } from 'react';

import createForm from '@/utils/createForm';

type IProps = IFormWithDrawer & { setValidate: (val: boolean) => void }

const CodeModalContent: React.FC<IProps> = ({ register = () => void 0, setValidate = () => void 0 }) => {

  const config: ICreateFormConfig = {
    formConfig: {
      layout: 'vertical',
      itemsRequire: true
    },
    components: [
      { label: '密钥', name: 'code' }
    ]
  };
  const { formStructure, form } = createForm(config);

  const handleFinish = useCallback(async () => {
    const values: { code: string; } = await form.validateFields();

    sessionStorage.setItem('code', values.code);
    setValidate(true);
  }, []);

  // 向父组件的提交按钮, 注册`handleFinish`
  useEffect(() => {
    register(handleFinish);
  }, [register, handleFinish]);

  return formStructure;
};

export default CodeModalContent;