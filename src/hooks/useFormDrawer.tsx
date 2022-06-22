import type { DrawerProps } from 'antd';
import type { ReactElement } from 'react';

import { Drawer, Space, Button } from 'antd';
import { cloneElement, Fragment, useState, useRef } from 'react';

interface IOpenDrawer
  extends Omit<DrawerProps, 'visible' | 'onCancel' | 'onOk' | 'confirmLoading'> {
  content: ReactElement;
  refresh?: () => void;
}

type CallBack = () => Promise<unknown>;
export interface IFormWithDrawer {
  register?: (fn: CallBack) => unknown;
}

const useFormDrawer = () => {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [DrawerProps, setDrawerProps] = useState<IOpenDrawer>({ content: <Fragment /> });
  const callbackRef = useRef<CallBack>(() => Promise.resolve(true));

  const { content, refresh = () => void 0, ...rest } = DrawerProps;

  const closeDrawer = () => setVisible(false);

  const openDrawer = (config: IOpenDrawer) => {
    setDrawerProps(config);
    setVisible(true);
  };

  const handleOk = async () => {
    try {
      setConfirmLoading(true);
      await callbackRef.current?.call(null);
      closeDrawer();
      refresh();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('error:', (error as Error).message);
    } finally {
      setConfirmLoading(false);
    }
  };

  const Footer = (
    <div style={{ textAlign: 'right' }}>
      <Space>
        <Button onClick={closeDrawer}>取消</Button>
        <Button type="primary" loading={confirmLoading} onClick={handleOk}>
          确定
        </Button>
      </Space>
    </div>
  );

  const AntdDrawer = (
    <Drawer
      width={600}
      destroyOnClose
      visible={visible}
      footer={Footer}
      closable={false}
      onClose={() => setVisible(false)}
      {...rest}
    >
      {cloneElement(content, {
        register: (fn: CallBack) => {
          callbackRef.current = fn;
        }
      })}
    </Drawer>
  );

  return {
    Drawer: AntdDrawer,
    closeDrawer,
    openDrawer
  };
};

export default useFormDrawer;