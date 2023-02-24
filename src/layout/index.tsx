import type { ReactNode } from 'react'
import type { MenuInfo } from 'rc-menu/lib/interface'

import { Layout, Menu, Empty, message } from 'antd'
import { useState, useEffect } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'

import menuItems from './menuItems'
import styles from './index.module.less'
import { logoImg } from '@/globalConfig'
import switchRender from '@/utils/switchRender'
import useUserInfo from '@/hooks/userUserInfo'
import PopoverHandle from '@/layout/popoverHandle'

const { Content, Header, Footer, Sider } = Layout

const ManageLayout = () => {
  const user = useUserInfo()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const validate = user?.role === 'admin'
  const [collapsed, setCollapsed] = useState(false)

  const activeKey = pathname.split('/').slice(-1)

  const onMenuItemClick = ({ key }: MenuInfo) => {
    navigate(`/manage/${key}`)
  }

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
    <>
      {switchRender(
        validateRender(validate, <Outlet />),
        <Layout className={styles.container}>
          <Sider
            collapsible
            theme="light"
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
          >
            <div className={styles.logo}>
              <img
                src={logoImg}
                className={styles.logoSvg}
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
          <Layout className={styles.contentLayout}>
            <Header className={styles.header}>
              <PopoverHandle />
            </Header>
            {validateRender(
              validate,
              <Content className={styles.content}>
                <Outlet />
              </Content>
            )}
            <Footer>MuMuIo Designed by Sanfen, GuoSen, JingLi. 2022</Footer>
          </Layout>
        </Layout>,
        activeKey[0] === 'markdown'
      )}
    </>
  )
}

export default ManageLayout
