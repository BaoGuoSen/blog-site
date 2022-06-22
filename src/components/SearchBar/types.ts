/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FormInstance } from 'antd';
import type { IFormItemProps } from '@/utils/createForm/types';

export type CurrentStatus = 'folded' | 'unfolded';

export interface SearchBarProps {
  loading?: boolean;
  form?: FormInstance;
  onReset?: () => unknown;
  fields: IFormItemProps[];
  countEveryLine?: 2 | 3 | 4 | 6;
  initialValues?: Record<string, unknown>;
  buttonPosition?: 'left' | 'center' | 'right';
  onSearch?: (val: Record<string, any>) => unknown;
}