import type { FormItemProps } from 'antd';
import type { FormItemRules } from './rules.map';

export interface IEnhancedFormItemProps extends Omit<FormItemProps, 'rules'> {
  /**
   * 是否必填
   */
  require?: boolean;
  /**
   * 验证规则
   */
  rules?: FormItemRules[];
  /**
   * 长度/数值范围 验证
   */
  range?: [number, number];
}