import type { Rule } from 'rc-field-form/lib/interface'

export const rulesMap = new Map([
  ['int', { pattern: /^[0-9]*$/, message: '只能输入整数' }],
  ['double', { pattern: /^\d+\.\d+$|^\d*$/, message: '只能输入数字' }],
  ['phone', { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的电话号码' }],
  [
    'email',
    {
      pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
      message: '请输入正确的邮箱'
    }
  ],
  ['word', { pattern: /^[0-9a-zA-Z]*$/, message: '只能输入数字或字母' }],
  [
    'normalWord',
    {
      pattern: /^[\w\u4e00-\u9fa5]*$/,
      message: '只能输入英文/汉字/数字/下划线'
    }
  ],
  [
    'password',
    {
      pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]*$/,
      message: '必须包含字母和数字'
    }
  ],
  [
    'account',
    {
      required: true,
      pattern: /^[a-zA-Z]{1}[a-zA-Z0-9_]{5,17}$/i,
      message: '请输入正确用户名'
    }
  ]
] as const)

type KeyofUsusalRules = Parameters<typeof rulesMap.get>[0]

export type FormItemRules = Rule | KeyofUsusalRules
