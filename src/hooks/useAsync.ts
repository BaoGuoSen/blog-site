/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useCallback } from 'react';

const useAsync = <A extends Record<string, any>, T>(
  asyncFunction: (args: A) => Promise<T>,
  {
    params,
    immediate = true
  }: {
    params?: A;
    immediate?: boolean;
  } = {}) => {
  // 用于更复杂的状态
  const [value, setValue] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  /**
   * @description 成功返回true, 失败返回false
   * @return boolean
   */
  const execute = useCallback(
    async (arg: A) => {
      setLoading(true);

      try {
        const response = await asyncFunction(arg);
        setValue(response);
        return response;
      } catch (err) {
        const errMsg = (err as Error).message;
        throw new Error(errMsg);
      } finally {
        setLoading(false);
      }
    },
    [asyncFunction]
  );

  // 如果需要立即执行
  useEffect(() => {
    if (immediate) {
      execute(params as A);
    }
  }, []);

  return { execute, status, value, loading, setValue };
};

export default useAsync;