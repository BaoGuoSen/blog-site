import type { MenuInfo } from 'rc-menu/lib/interface';

import { useState, useEffect } from 'react';
import { Layout, Menu, Empty } from 'antd';
import { Outlet, useNavigate } from "react-router-dom";

import menuItems from './menuItems';
import styles from './index.module.less';
import CodeModalContent from './modalContent';
import useFormModal from '@/hooks/useFormModal';

const { Content, Footer, Sider } = Layout;

const ManageLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const { Modal: CodeModal, openModal } = useFormModal();
  const [validate, setValidate] = useState(false);

  const onMenuItemClick = ({ key }: MenuInfo) => {
    navigate(`/manage/${key}`);
  };

  // 后台权限控制
  useEffect(() => {
    if (sessionStorage.getItem('code')) {
      setValidate(true);
      return;
    }

    openModal({
      title: '密钥验证',
      closable: false,
      keyboard: false,
      centered: true,
      showCancel: false,
      content: <CodeModalContent setValidate={setValidate} />
    });
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
          onClick={onMenuItemClick}
          theme="light"
          defaultSelectedKeys={['author']}
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