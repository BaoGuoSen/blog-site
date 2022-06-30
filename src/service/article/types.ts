import { Tag } from "../tag/types";

interface Article {
  /**
   * 主键id
   */
  id: number;
  /**
   * 文章标题
   */
  title: string;
  /**
   * 文章摘要
   */
  desc?: string;
  /**
   * 封面图
   */
  backgroundUrl?: string;
  /**
   * 发布日期
   */
  createdAt: string;
  /**
   * 作者id
   */
  authorId?: number;
  /**
   * 文章所属标签
   */
  tags?: Tag[];
  /**
   * 文章阅读量
   */
  viewCount: number;
  /**
   * markdown
   */
  content: string;
  /**
   * 预计阅读时长
   */
  readingTime: string;
}

export type { Article };