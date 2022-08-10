import { Menu, Spin } from 'antd'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import styles from './index.module.less'
import useAsync from '../../hooks/useAsync'
import { getAllTools } from '@/service/tool'

const Index: React.FC = () => {
  const [current, setCurrent] = useState<number>(0)
  const { value: toolList = [], loading: fetchingTools } = useAsync(getAllTools)
  const [loading, setLoading] = useState(false)

  const [query, setQuery] = useSearchParams()
  const tooId = query.get('id')

  useEffect(() => {
    if (toolList.length === 0) return

    const key = Number(tooId) || toolList[0].id
    setCurrent(key)

    const { cssHref, scriptUrl } = toolList.find(({ id }) => id === key)!
    loadStyle(cssHref?.split(','))
    loadScript(scriptUrl?.split(','))
  }, [toolList])

  const loadScript = (urls: string[]) => {
    urls.forEach((url) => {
      const script = document.createElement('script')
      script.src = url
      script.type = 'module'
      script.crossOrigin = 'crossOrigin'
      script.onload = () => setLoading(false)

      document.querySelector('.child-app header')?.appendChild(script)
    })
  }

  const loadStyle = (hrefs: string[]) => {
    hrefs.forEach((href) => {
      const css = document.createElement('link')
      css.href = href
      css.rel = 'stylesheet'

      document.querySelector('.child-app header')?.appendChild(css)
    })
  }

  const onChange = ({ key }: { key: string }) => {
    setLoading(true)
    setQuery({ id: key }, { replace: true })
    window.location.reload()
  }

  return (
    <div>
      <Spin spinning={loading || fetchingTools}>
        <div className={styles.wrapper}>
          <Menu
            onClick={onChange}
            selectedKeys={[String(current)]}
            mode="horizontal"
            items={toolList?.map(({ title, id }) => ({
              label: title,
              key: id
            }))}
          />
          <div className="child-app">
            <header></header>
            <div id="root" />
          </div>
        </div>
      </Spin>
    </div>
  )
}

export default Index
