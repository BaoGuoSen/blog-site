import type { FC } from 'react';

import { stringify } from 'qs';
import { Badge, Input } from 'antd';
import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

import Box3D from '@/components/Box3D';
import ParticlesBg from 'particles-bg';
import useAsync from '@/hooks/useAsync';
import styles from './index.module.less';
import randomInt from '@/utils/randomInt';
import { maxBoxSize, minBoxSize } from '../../../globalConfig';
import { getTagsByPersonal, getTagsByPlatform } from '@/service/tag';

const Index: FC = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const authorId = Number(params.get('authorId'));
  const shouldCall = authorId ? getTagsByPersonal : getTagsByPlatform;

  const { value: tags = [] } = useAsync(shouldCall, { params: { authorId } });
  const [localTags, setLocalTags] = useState<typeof tags>([]);

  const renderTags = (data: typeof tags) => {
    if (data.length === 0) return null;

    const maxViewCount = Math.max(
      ...data.map(({ viewCount }) => viewCount)
    );

    return [
      { name: '全部', id: '0', viewCount: maxViewCount, articleCount: undefined, icon: undefined },
      ...data
    ].map(
      ({ id, name, viewCount, articleCount, icon }) => {
        const size = (() => {
          if (maxViewCount === 0) return maxBoxSize;

          if (viewCount === 0) return minBoxSize;

          return (viewCount / maxViewCount) * maxBoxSize;
        })();
        const rate = size / maxBoxSize;

        return (
          <Box3D
            key={id}
            animation
            className={styles.tag}
            text={{
              forward: {
                children: (
                  <Badge count={articleCount} overflowCount={999}>
                    <span style={{ fontSize: Math.max(rate * 77, 20) }}>{name}</span>
                  </Badge>
                )
              },
              up: {
                children: (
                  icon && <img src={icon} className={styles.icon} />
                )
              }
            }}
            size={Math.max(size, minBoxSize)}
            onClick={() => {
              navigate('/article/list?' + stringify({
                authorId: authorId ? authorId : undefined,
                tagId: name === '全部' ? undefined : id
              }));
            }}
            style={{
              margin: `${randomInt(100, 160)}px ${randomInt(80, 120)}px`,
              float: Math.random() < 0.5 ? 'left' : 'right'
            }}
          />
        );
      }
    );

  };

  const handleSearch = (searchVal?: string) => {
    if (!searchVal) {
      setLocalTags(tags);
      return;
    }

    const newTags = tags.filter(
      ({ name }) => new RegExp(searchVal, 'i').test(name)
    );
    setLocalTags(newTags);
  };

  useEffect(() => {
    if (tags.length === 0) return;

    setLocalTags(tags);
  }, [tags]);
  return (
    <div className={styles.wrapper}>
      <ParticlesBg bg type="square" />

      <Input.Search
        placeholder="输入Tag名称"
        onChange={e => handleSearch(e.target.value)}
      />
      <div className={styles.tags}>
        {renderTags(localTags)}
      </div>
    </div>
  );
};

export default Index;