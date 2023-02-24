interface User {
  /**
   * 用户主键Id
   */
  id: number
  /**
   * 账户名
   */
  username: string
  /**
   * 密码
   */
  password: string
  /**
   * 用户角色
   */
  role: 'admin' | 'user'
  /**
   * 是否是贡献者
   */
  isContributor: boolean
  /**
   * 昵称
   */
  name?: string
  /**
   * 头像
   */
  avatar?: string
  /**
   * 卡片背景
   */
  backgroundUrl?: string
  /**
   * 个人签名
   */
  desc?: string
  /**
   * 注册日期
   */
  createAt?: string
  /**
   * 邮箱
   */
  email?: string
  /**
   * git地址
   */
  github?: string
  /**
   * total view
   */
  totalViewCount: number
}

interface Login {
  /**
   * 账户
   */
  username: string
  /**
   * 密码
   */
  password: string
}

export type { User, Login }
