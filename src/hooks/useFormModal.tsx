import type { ModalProps } from 'antd'
import type { ReactElement } from 'react'

import { Modal, Button, Space } from 'antd'
import { cloneElement, Fragment, useState, useRef } from 'react'

interface IOpenModal
  extends Omit<ModalProps, 'visible' | 'onCancel' | 'onOk' | 'confirmLoading'> {
  content: ReactElement
  showCancel?: boolean
  refresh?: () => void
}

type CallBack = () => Promise<unknown>
export interface IFormWithModal {
  register?: (fn: CallBack) => unknown
}

const useFormModal = () => {
  const [visible, setVisible] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [modalProps, setModalProps] = useState<IOpenModal>({
    content: <Fragment />
  })
  const callbackRef = useRef<CallBack>(() => Promise.resolve(true))

  const {
    content,
    showCancel = true,
    refresh = () => void 0,
    ...rest
  } = modalProps

  const closeModal = () => setVisible(false)

  const openModal = (config: IOpenModal) => {
    setModalProps(config)
    setVisible(true)
  }

  const handleOk = async () => {
    try {
      setConfirmLoading(true)
      await callbackRef.current?.call(null)
      closeModal()
      refresh()
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('error:', (error as Error).message)
    } finally {
      setConfirmLoading(false)
    }
  }

  const Footer = (
    <div style={{ textAlign: 'right' }}>
      <Space>
        {showCancel && <Button onClick={closeModal}>取消</Button>}
        <Button type="primary" loading={confirmLoading} onClick={handleOk}>
          确定
        </Button>
      </Space>
    </div>
  )

  const AntdModal = (
    <Modal
      destroyOnClose
      visible={visible}
      onOk={handleOk}
      maskClosable={false}
      confirmLoading={confirmLoading}
      onCancel={closeModal}
      footer={Footer}
      {...rest}
    >
      {cloneElement(content, {
        register: (fn: CallBack) => {
          callbackRef.current = fn
        }
      })}
    </Modal>
  )

  return {
    Modal: AntdModal,
    closeModal,
    openModal
  }
}

export default useFormModal
