import type { Article } from '@/service/article/types';
import type { IFormWithDrawer } from '@/hooks/useFormDrawer';
import type { ICreateFormConfig } from '@/utils/createForm/types';

import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import createForm from '@/utils/createForm';
import { modelComponents } from './staticModel';
import useGlobalData from '@/hooks/useGlobalData';
import { addArticle, updateArticle } from '@/service/article';

type IProps = IFormWithDrawer & { data: Article }

const ModalContent: React.FC<IProps> = ({ register = () => void 0, data }) => {
  const navigate = useNavigate();
  const { userOptions, tagOptions } = useGlobalData();
  const config: ICreateFormConfig = {
    formConfig: {
      labelCol: {
        span: 4
      },
      data
    },
    components: modelComponents(userOptions, tagOptions)
  };
  const { formStructure, form } = createForm(config);

  const handleFinish = useCallback(async () => {
    const res = await form.validateFields();
    const params = { ...data, ...res };

    if (data?.id) {
      await updateArticle(params);
    } else {
      await addArticle(params);
    }

    navigate(-1);
  }, []);

  // 向父组件的提交按钮, 注册`handleFinish`
  useEffect(() => {
    register(handleFinish);
  }, [register, handleFinish]);

  return formStructure;
};

export default ModalContent;