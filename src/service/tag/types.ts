interface Tag {
  /**
   * tagId
   */
  id: number;
  /**
   * tag名稱
   */
  name: string;
  /**
   * icon
   */
  icon?: string;
}
interface TagWithCountInfo {
  /**
   * 文章数目
   */
  articleCount: number;
  /**
   * tag浏览量
   */
  viewCount: number;
}

export type { Tag, TagWithCountInfo };