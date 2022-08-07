interface Tool {
  /**
   * 主键
   */
  id: string;
  /**
   * css资源地址
   */
  cssHref: string;
  /**
   * script脚本地址
   */
  scriptUrl: string;
  /**
   * 工具名称(唯一)
   */
  title: string;
}

export type { Tool };