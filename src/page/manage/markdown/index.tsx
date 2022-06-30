import { Input, Button } from 'antd';
import { useSearchParams } from "react-router-dom";

import useAsync from '@/hooks/useAsync';
import styles from './index.module.less';
import ModalContent from './modalContent';
import { Editor } from '@/components/Markdown';
import useFormModal from '@/hooks/useFormModal';
import { getArticleDetail } from '@/service/article';

const Index = () => {
  const { Modal, openModal } = useFormModal();
  const [seachParams] = useSearchParams();

  const id = Number(seachParams.get('id'));
  const { value, setValue } = useAsync(getArticleDetail, { params: { id: Number(id) }, immediate: Boolean(id) });
  const { title, content } = value || {};

  const pushhArticle = () => {
    openModal({
      title: id ? '更新文章' : '发布文章',
      centered: true,
      content: <ModalContent data={value!} />
    });
  };

  const hancleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: title } = e.target;

    setValue({ ...value!, title });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Input value={title} placeholder="请输入文章标题" bordered={false} onChange={hancleChange} />
        <Button disabled={!title || !content} onClick={pushhArticle} type="primary">{id ? '更新' : '发布'}</Button>
      </div>

      <div className={styles.markdown}>
        <Editor value={content} onChange={(content) =>
          setValue({ ...value!, content })
        } />
      </div>

      {Modal}
    </div>
  );
};

export default Index;