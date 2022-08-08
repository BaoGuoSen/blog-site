import type { ReactNode } from 'react'
import type { MenuInfo } from 'rc-menu/lib/interface'

import { Layout, Menu, Empty } from 'antd'
import { useState, useEffect } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'

import menuItems from './menuItems'
import styles from './index.module.less'
import CodeModalContent from './modalContent'
import { confirmAuth } from '@/service/common'
import useFormModal from '@/hooks/useFormModal'
import switchRender from '@/utils/switchRender'

const { Content, Footer, Sider } = Layout

const ManageLayout = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [validate, setValidate] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const { Modal: CodeModal, openModal } = useFormModal()

  const activeKey = pathname.split('/').slice(-1)

  const onMenuItemClick = ({ key }: MenuInfo) => {
    navigate(`/manage/${key}`)
  }

  const authModal = () => {
    openModal({
      title: '密钥验证',
      closable: false,
      keyboard: false,
      centered: true,
      showCancel: false,
      content: <CodeModalContent setValidate={setValidate} />
    })
  }

  // 后台权限控制
  useEffect(() => {
    const isAuth = async () => {
      const code = localStorage.getItem('code')

      if (!code) {
        authModal()
        return
      }

      try {
        await confirmAuth({ code })
        setValidate(true)
      } catch (error) {
        authModal()
      }
    }

    isAuth()
  }, [])

  const validateRender = (validate: boolean, Node: ReactNode) => {
    return validate ? (
      Node
    ) : (
      <div className={styles['empty-container']}>
        <Empty description={<span>暂无访问权限</span>} />
      </div>
    )
  }

  return (
    <Layout className={styles.container} style={{ minHeight: '100vh' }}>
      {switchRender(
        validateRender(validate, <Outlet />),
        <>
          <Sider
            collapsible
            theme="light"
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
          >
            <div className={styles.logo}>
              <img
                src="http://43.136.172.140/favicon.png"
                className={styles.svg}
                onClick={() => navigate('/')}
              />
              <span className={styles.logoName}>木木记</span>
            </div>
            <Menu
              selectedKeys={activeKey}
              onClick={onMenuItemClick}
              theme="light"
              items={menuItems}
            />
          </Sider>
          <Layout className="site-layout">
            {validateRender(
              validate,
              <Content style={{ padding: '24px 24px 0' }}>
                <Outlet />
              </Content>
            )}
            <Footer style={{ textAlign: 'center' }}>
              MuMuIo Designed by Sanfen, GuoSen. 2022
            </Footer>
          </Layout>
          ,
        </>,
        activeKey[0] === 'markdown'
      )}

      {CodeModal}
    </Layout>
  )
}

export default ManageLayout
