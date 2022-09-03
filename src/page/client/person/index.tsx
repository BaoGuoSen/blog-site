import type { FC } from 'react'

// import { Avatar } from 'antd'
// import { useNavigate } from 'react-router-dom'
// import { GithubOutlined } from '@ant-design/icons'

import styles from './index.module.less'
// import useAsync from '@/hooks/useAsync'

const Index: FC = () => {
  // const navigate = useNavigate()

  return (
    <div className={styles.container}>
      {/* 个人信息 */}
      <div className={styles.personal}>
        上：个人信息
        下：邮箱 github等信息
      </div>
      {/* 文章列表 */}
      <div className={styles.article}>
        <div className={styles.out}></div>
        <div></div>
      </div>
    </div>
  )
}

export default Index
