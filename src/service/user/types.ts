interface User {
  /**
   * 用户主键Id
   */
  id: number;
  /**
   * 昵称
   */
  name?: string;
  /**
   * 头像
   */
  avatar?: string;
  /**
   * 卡片背景
   */
  backgroundUrl?: string;
  /**
   * 个人签名
   */
  desc?: string;
  /**
   * 注册日期
   */
  createTime?: string;
  /**
   * 邮箱
   */
  email?: string;
  /**
   * git地址
   */
  github?: string;
}

export type { User };