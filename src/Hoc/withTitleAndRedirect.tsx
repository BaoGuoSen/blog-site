import type { MyRoute } from '../router/index'

import { useEffect } from 'react'
import Redirect from '@/components/Redirect'

type Props = Pick<MyRoute, 'element' | 'title' | 'redirect'> & {
  basePath: string
}

function withTitleAndRedirect({
  title,
  redirect,
  basePath,
  element: Element = () => null
}: Props) {
  const NewCmp = () => {
    // 设置标题
    useEffect(() => {
      if (title) {
        document.title = title
      }
    }, [])

    return redirect ? <Redirect to={basePath + redirect} /> : <Element />
  }
  return <NewCmp />
}

export default withTitleAndRedirect
