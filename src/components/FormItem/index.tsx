import type { IEnhancedFormItemProps } from './types'
import type { FormItemRules } from './rules.map'

import React from 'react'
import { Form } from 'antd'

import { rulesMap } from './rules.map'

const Index: React.FC<IEnhancedFormItemProps> = ({
  range,
  rules = [],
  require = false,
  ...rest
}) => {
  const newRules = rules.map(convertRule)

  if (require) newRules.push({ required: true, message: '该项为必填项' })

  if (range) {
    const [min, max] = range
    newRules.push({
      validator: validateRange(min, max)
    })
  }
  return <Form.Item {...rest} rules={newRules} />
}

export default Index

function validateRange(min: number, max: number) {
  return async function validator(_: unknown, val: number | string) {
    if (val === null || val === undefined || val === '') {
      return
    }

    if (typeof val === 'number') {
      if (min === max && val !== min) {
        throw new Error(`数值只能为${min}`)
      }

      if (min === -Infinity || max === Infinity) {
        if (val < min) {
          throw new Error(`数值不能小于${min}`)
        }

        if (val > max) {
          throw new Error(`数值不能大于${max}`)
        }
      }

      if (val < min || val > max) {
        throw new Error(`数值必须在${min}-${max}之间`)
      }
    }

    if (typeof val === 'string') {
      const strLen = val.length

      if (min === max && strLen !== min) {
        throw new Error(`字符长度必须为${min}位`)
      }

      if (min === -Infinity || max === Infinity) {
        if (strLen < min) {
          throw new Error(`字符长度不能小于${min}位`)
        }

        if (strLen > max) {
          throw new Error(`字符长度不能超过${max}位`)
        }
      }

      if (strLen < min || strLen > max) {
        throw new Error(`长度必须在${min}-${max}之间`)
      }
    }
  }
}

function convertRule(rule: FormItemRules) {
  if (typeof rule === 'string') return rulesMap.get(rule) || {}

  return rule
}
