interface Article {
  /**
   * 主键id
   */
  id: number;
  /**
   * title
   */
  title?: string;
  /**
   * desc
   */
  desc?: string;
  /**
   * backgroundUrl
   */
  backgroundUrl?: string;
  /**
   * 作者id
   */
  authorId?: number;
  /**
   * tag
   */
  tags?: 'id';
  /**
   * markdown
   */
  content?: string;
}

export type { Article };