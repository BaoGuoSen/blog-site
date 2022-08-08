import type { UploadFile } from 'antd/lib/upload/interface'

export interface IUploadProps {
  /**
   * 来自表单的值
   */
  value?: string | null
  /**
   * 文件最大大小, 单位: Kb
   */
  maxSize?: number
  /**
   * 文件最小大小, 单位: Kb
   */
  minSize?: number
  /**
   * 针对图片限制上传的固定宽度
   */
  limitWidth?: number
  /**
   * 针对图片限制上传的固定高度
   */
  limitHeight?: number
  /**
   * 允许的文件类型
   */
  accept?: string
  /**
   * 允许的最大数量
   */
  maxCount?: number
  onChange?: (val: string) => void
  listType?: 'picture' | 'picture-card' | 'text'
  /**
   * 图片上传api
   */
  request?: (file: File) => Promise<string>
  /**
   * 回显值, 默认不回显
   */
  showValue?: boolean
  /**
   * 上传按钮文字
   */
  uploadText?: string
  /**
   * 文件列表类型上传按钮文字
   */
  uploadButtonText?: string
}

export interface FileListItem extends Omit<UploadFile, 'url'> {
  url: string
}
