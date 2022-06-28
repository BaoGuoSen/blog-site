import { useEffect } from 'react';

/**
 * @description 封装计时器, 在跳转页面时销毁
 * @param callback 回调函数
 * @param ms 倒计时时间
 */
function useTimeout(
  callback: (...args: unknown[]) => unknown,
  ms: number
) {

  useEffect(() => {
    const timer = setTimeout(callback, ms);

    return () => clearTimeout(timer);
  }, []);
}

export default useTimeout;