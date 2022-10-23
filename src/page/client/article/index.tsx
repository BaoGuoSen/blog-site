import type { Tag as TagType } from '@/service/tag/types'

import { useEffect } from 'react'
import { Tag, Avatar, Card, Skeleton, Tooltip } from 'antd'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { GithubOutlined, MailOutlined, EyeOutlined } from '@ant-design/icons'

import useAsync from '@/hooks/useAsync'
import styles from './index.module.less'
import useTimeout from '@/hooks/useTimeout'
import { getUserCard } from '@/service/user'
import mergeClassName from '@/utils/mergeClassName'
import randomTagColor from '@/utils/randomTagColor'
import ThreeColLayout from './ThreeColLayout'
import { Catalogue, Viewer } from '@/components/Markdown'
import {
  countArticle,
  getArticleDetail,
  getSimilarArticles
} from '@/service/article'

const Index: React.FC = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const id = Number(searchParams.get('id'))
  const { value: detail, loading } = useAsync(getArticleDetail, {
    params: { id }
  })
  const { value: recommendList = [] } = useAsync(getSimilarArticles, {
    params: { id }
  })
  const {
    value: authorInfo,
    execute: getUserCardData,
    loading: userLoading
  } = useAsync(getUserCard, { immediate: false })

  const {
    title,
    content,
    authorId,
    tags = [],
    viewCount,
    createdAt,
    readingTime,
    backgroundUrl,
    desc: articleDesc
  } = detail || {}
  const { avatar, desc, github, email, name, totalViewCount } = authorInfo || {}

  const renderTags = (tags: TagType[]) =>
    tags.map(({ name, id }) => (
      <Tag
        key={name}
        className={styles.tag}
        color={randomTagColor()}
        onClick={() => navigate(`/article/list?tagId=${id}`)}
      >
        {name}
      </Tag>
    ))

  useEffect(() => {
    if (!authorId) return
    getUserCardData({ id: authorId })
  }, [authorId])

  useTimeout(() => countArticle({ id }), 20 * 1000)
  return (
    <div className={styles.wrapper}>
      <div
        className={styles.bar}
        style={{ width: detail ? '100%' : undefined }}
      />

      <ThreeColLayout
        main={
          <Skeleton title active loading={loading} paragraph={{ rows: 16 }}>
            <div className={styles.article}>
              <div className={styles.header}>
                <div className={mergeClassName(styles.title, 'text-ellipsis')}>
                  {title}
                </div>

                <div className={styles.subTitle}>
                  {articleDesc && <div>{articleDesc}</div>}
                </div>

                <div
                  className={mergeClassName(
                    styles.info,
                    styles.light_color,
                    styles.set_margin_to_children
                  )}
                >
                  <span>{createdAt}</span>
                  <span>阅读量:{viewCount}</span>
                  <i className={styles.readingTime}>{readingTime}分钟</i>
                </div>

                <div className="text-right">{renderTags(tags)}</div>

                {backgroundUrl && (
                  <img src={backgroundUrl} className={styles.cover} />
                )}
              </div>

              <Viewer value={content} />
            </div>
          </Skeleton>
        }
        left={
          <Skeleton active loading={loading}>
            <div className={styles.catalogue}>
              <Catalogue value={content} />
            </div>
          </Skeleton>
        }
        right={
          <Skeleton avatar loading={userLoading && !!authorId}>
            {authorId && (
              <Card className={styles.user}>
                <div className="flex">
                  <Avatar src={avatar} className={styles.avatar} />

                  <div>
                    <div className={styles.name}>{name}</div>
                    <div className={styles.light_color}>{desc}</div>
                  </div>
                </div>

                {/* 邮箱以及git */}
                {(github || email) && (
                  <div
                    className={mergeClassName(
                      styles.icons,
                      styles.set_margin_to_children
                    )}
                  >
                    <a href={github} target="_blank">
                      <GithubOutlined />
                    </a>
                    <Tooltip title={email}>
                      <MailOutlined />
                    </Tooltip>
                  </div>
                )}

                <div className={mergeClassName(styles.count_line, 'flex')}>
                  <EyeOutlined className={styles.count_icon} />
                  <span>文章被阅读: {totalViewCount?.toLocaleString()}</span>
                </div>
              </Card>
            )}

            <Card title="相关推荐" className={styles.similar}>
              {recommendList.map(({ viewCount, readingTime, title, id }) => (
                <div className={styles.similar_item} key={id}>
                  <a
                    target="_blank"
                    href={'?id=' + id}
                    className={styles.title}
                  >
                    {title}
                  </a>

                  <div
                    className={mergeClassName(
                      styles.bottom,
                      styles.light_color,
                      styles.set_margin_to_children
                    )}
                  >
                    <span>阅读量:{viewCount.toLocaleString()}</span>
                    <i className={styles.readingTime}>{readingTime}分钟</i>
                  </div>
                </div>
              ))}
            </Card>
          </Skeleton>
        }
      />
    </div>
  )
}

export default Index
