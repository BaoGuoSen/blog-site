import React from 'react'
import { Badge } from 'antd'

import { Article } from '@/service/article/types'
import styles from './index.module.less'
import { useNavigate } from 'react-router-dom'
import Avatar from 'antd/lib/avatar/avatar'
import { articleCardColors } from '@/utils/randomTagColor'
import { randomArticleCardColor } from '../../utils/randomTagColor'

interface IProps {
  article: Article
}

const ArticleBook: React.FC<IProps> = ({
  article: {
    id,
    desc,
    title,
    avatar,
    authorId,
    viewCount,
    authorName,
    readingTime
  }
}) => {
  const navigate = useNavigate()

  const handleBook = () => navigate(`/article?id=${id}`)

  const getColor = randomArticleCardColor(articleCardColors)
  return (
    <div onClick={handleBook} className={styles.container}>
      <Badge count={viewCount} showZero>
        <div
          className={styles.content}
          style={{ backgroundColor: getColor(0.5) }}
        >
          <span className={styles.title}>{title}</span>

          <div className={styles.readingTime}>
            <i style={{ backgroundColor: getColor() }}>{readingTime}分钟</i>
          </div>

          <em className={styles.desc}>{desc}</em>

          {authorId && (
            <div className={styles.author}>
              <Avatar src={avatar} className={styles.avatar} />
              <span className={styles.authorName}>--{authorName}</span>
            </div>
          )}

          <div className={styles.shadowOne} />

          <div className={styles.shadowTwo} />

          <div className={styles.shadowThree} />
        </div>
      </Badge>
    </div>
  )
}

export default ArticleBook
