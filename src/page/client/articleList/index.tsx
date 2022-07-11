import type { FC } from 'react';

import ParticlesBg from 'particles-bg';
import { useSearchParams } from 'react-router-dom';

import styles from './index.module.less';
import useAsync from '../../../hooks/useAsync';
import ArticleBook from '@/components/ArticleBook';
import { getClientArticles } from '@/service/article';

const Index: FC = () => {
  const [params] = useSearchParams();
  const tagId = Number(params.get('tagId'));
  const authorId = Number(params.get('authorId'));

  const { value: articles = [] } = useAsync(getClientArticles, { params: { authorId, tagId } });

  return (
    <div className={styles.wrapper}>
      <ParticlesBg bg type="lines" />

      <div className={styles.articles}>
        {
          articles.map(item => (
            <ArticleBook article={item} key={item.id} />
          ))
        }
      </div>
    </div>
  );
};

export default Index;