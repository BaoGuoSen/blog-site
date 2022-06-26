import type { MenuInfo } from 'rc-menu/lib/interface';

import { Layout, Menu, Empty } from 'antd';
import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from "react-router-dom";

import menuItems from './menuItems';
import styles from './index.module.less';
import CodeModalContent from './modalContent';
import { confirmAuth } from '@/service/common';
import useFormModal from '@/hooks/useFormModal';

const { Content, Footer, Sider } = Layout;

const ManageLayout = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [validate, setValidate] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const { Modal: CodeModal, openModal } = useFormModal();

  const activeKey = pathname.split('/').slice(-1);

  const onMenuItemClick = ({ key }: MenuInfo) => {
    navigate(`/manage/${key}`);
  };

  const authModal = () => {
    openModal({
      title: '密钥验证',
      closable: false,
      keyboard: false,
      centered: true,
      showCancel: false,
      content: <CodeModalContent setValidate={setValidate} />
    });
  };

  // 后台权限控制
  useEffect(() => {
    const isAuth = async () => {
      const code = sessionStorage.getItem('code');

      if (!code) {
        authModal();
        return;
      }

      try {
        await confirmAuth({ code });
        setValidate(true);
      } catch (error) {
        authModal();
      }
    };

    isAuth();
  }, []);

  return (
    <Layout
      className={styles.container}
      style={{ minHeight: '100vh' }}
    >
      <Sider
        collapsible
        theme="light"
        collapsed={collapsed}
        onCollapse={value => setCollapsed(value)}
      >
        <div className={styles.logo}>logo</div>
        <Menu
          selectedKeys={activeKey}
          onClick={onMenuItemClick}
          theme="light"
          items={menuItems}
        />
      </Sider>

      <Layout className="site-layout">
        {/* <Header /> */}
        {validate ? (
          <Content style={{ padding: '24px 24px 0' }}>
            <Outlet />
          </Content>
        ) : (
          <div className={styles['empty-container']}>
            <Empty description={<span>暂无访问权限</span>} />
          </div>
        )}
        <Footer style={{ textAlign: 'center' }}>Ant Design 2018 Created by Ant UED</Footer>
      </Layout>

      {CodeModal}
    </Layout>
  );
};

export default ManageLayout;