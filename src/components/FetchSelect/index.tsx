/* eslint-disable @typescript-eslint/no-explicit-any */
import type { SelectProps } from 'antd'

import { Select, Spin, Empty } from 'antd'
import debounce from 'lodash/debounce'
import React, { useEffect, useMemo, useRef, useState } from 'react'

export interface DebounceSelectProps<ValueType = any>
  extends Omit<SelectProps<ValueType | ValueType[]>, 'options' | 'children'> {
  fetchOptions: (value: string) => Promise<ValueType[]>
  debounceTimeout?: number
  isRenderRequest?: boolean
}

function FetchSelect<
  ValueType extends {
    key?: string
    label: React.ReactNode
    value: string | number
  } = any
>({
  fetchOptions,
  debounceTimeout = 800,
  isRenderRequest = false,
  ...props
}: DebounceSelectProps<ValueType>) {
  const [fetching, setFetching] = useState(false)
  const [options, setOptions] = useState<ValueType[]>([])
  const fetchRef = useRef(0)

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value: string) => {
      fetchRef.current += 1
      const fetchId = fetchRef.current
      setOptions([])
      setFetching(true)

      fetchOptions(value).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return
        }

        setOptions(newOptions)
        setFetching(false)
      })
    }

    return debounce(loadOptions, debounceTimeout)
  }, [fetchOptions, debounceTimeout])

  useEffect(() => {
    if (isRenderRequest) {
      debounceFetcher('')
    }
  }, [isRenderRequest, debounceFetcher])

  return (
    <Select
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={
        fetching ? (
          <Spin size="small" />
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )
      }
      {...props}
      options={options}
    />
  )
}

export default FetchSelect
