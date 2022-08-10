/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FormProps, FormInstance } from 'antd'
import type { ReactElement, ReactNode } from 'react'
import type { IEnhancedFormItemProps } from '@/components/FormItem/types'

export interface IFormConfig extends FormProps {
  /**
   * 统一配置是否必填
   */
  itemsRequire?: boolean
  /**
   * 统一配置formItem的宽度
   */
  itemSpan?: number
  /**
   * 是否展示表单的值, 默认不展示
   * 若为true, FormItem的内容将渲染表单字段的值
   */
  showValue?: boolean
  /**
   * 是否只渲染Form.Item, 默认为false, 渲染整个Form表单
   */
  contentOnly?: boolean
  /**
   * 表单回显的值
   */
  data?: Record<string, any>
}

export interface IFormItemProps<T = Record<string, any>>
  extends Omit<IEnhancedFormItemProps, 'name'> {
  /**
   * FormItem name属性
   */
  name?: keyof T
  /**
   * item所占col
   */
  span?: number
  /**
   * FormItem内渲染的元素
   */
  element?: ReactElement | null
  /**
   * 是否撑满剩下空间, 默认不撑满
   */
  autoFit?: boolean
  /**
   * 和showValue联动, 展示表单字段的值
   */
  render?: (val?: any) => ReactNode
  /**
   * 此属性会传递到子元素(ReactElement上), 如果不指定, 则默认为: `请输入${label}`的格式
   */
  placeholder?: string | string[]
  /**
   * 只渲染此字段的值, 默认为false
   */
  displayOnly?: boolean
}

export type IComponent<T = Record<string, any>> =
  | ReactElement
  | undefined
  | null
  | boolean
  | IFormItemProps<T>

export type IFuncComponents<T = Record<string, any>> = (
  form: FormInstance
) => Array<IComponent<T>>
export type IComponentsConfig<T = any> =
  | IFuncComponents<T>
  | Array<IComponent<T>>
export interface ICreateFormConfig<T = any> {
  /**
   * form配置, 在antd FormProps上做了一些扩展
   */
  formConfig?: IFormConfig
  /**
   * form的子元素
   */
  components: IComponentsConfig<T>
}
