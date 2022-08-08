interface Tag {
  /**
   * tagId
   */
  id: number
  /**
   * tag名稱
   */
  name: string
  /**
   * icon
   */
  icon?: string
  /**
   * tag阅读量
   */
  viewCount?: number
}

interface TagWithCountInfo {
  /**
   * 文章数目
   */
  articleCount: number
  /**
   * tag浏览量
   */
  viewCount: number
}

interface TagRes {
  list: (Tag & TagWithCountInfo)[]
}
export type { Tag, TagWithCountInfo, TagRes }
