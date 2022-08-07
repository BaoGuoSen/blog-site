import type { Tool } from '@/service/tool/types';
import type { IFormWithDrawer } from '@/hooks/useFormDrawer';
import type { ICreateFormConfig } from '@/utils/createForm/types';

import { useEffect, useCallback } from 'react';

import createForm from '@/utils/createForm';
import { drawerFormComponents } from './staticModel';
import { addTool, updateTool } from '@/service/tool';

type IProps = IFormWithDrawer & { data?: Tool}

const TagDrawerContent: React.FC<IProps> = ({ register = () => void 0, data }) => {
  const config: ICreateFormConfig = {
    formConfig: {
      layout: 'vertical',
      itemsRequire: true,
      data
    },
    components: drawerFormComponents
  };
  const { formStructure, form } = createForm(config);

  const handleFinish = useCallback(async () => {
    const tag: Omit<Tool, 'id'> = await form.validateFields();

    if (data) {
      await updateTool({ ...tag, id: data.id });
      return;
    }

    await addTool(tag);
  }, []);

  // 向父组件的提交按钮, 注册`handleFinish`
  useEffect(() => {
    register(handleFinish);
  }, [register, handleFinish]);

  return <div>{formStructure}</div>;
};

export default TagDrawerContent;