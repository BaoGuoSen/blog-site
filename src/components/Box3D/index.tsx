import type { DOMAttributes, FC, ReactNode, CSSProperties } from 'react'

import styles from './index.module.less'
import mergeClassName from '@/utils/mergeClassName'

interface Face {
  children?: ReactNode
  backgroundUrl?: string
}
interface Box3DProps {
  text?: {
    up?: Face
    down?: Face
    left?: Face
    right?: Face
    forward?: Face
    back?: Face
  }
  animation?: boolean
  size: number
  className?: string
  style?: CSSProperties
}
const Box3D: FC<Box3DProps & DOMAttributes<HTMLDivElement>> = ({
  text = {},
  size,
  className = '',
  style,
  animation = false,
  ...rest
}) => {
  const { up, down, left, right, forward, back } = text

  // 最大方块
  const offset = (size >> 1) + 'px'

  return (
    <div
      className={mergeClassName(
        className,
        styles.box,
        animation ? styles.animation : ''
      )}
      style={{
        ...style,
        width: size,
        height: size
      }}
      {...rest}
    >
      <div
        style={{ transform: `rotateX(90deg) translateZ(${offset})` }}
        className={styles.up}
      >
        {up?.children}
      </div>
      <div
        style={{ transform: `rotateX(-90deg) translateZ(${offset})` }}
        className={styles.down}
      >
        {down?.children}
      </div>
      <div
        style={{ transform: `rotateY(90deg) translateX(-${offset})` }}
        className={styles.left}
      >
        {left?.children}
      </div>
      <div
        style={{ transform: `rotateY(90deg) translateX(${offset})` }}
        className={styles.right}
      >
        {right?.children}
      </div>
      <div
        style={{ transform: `translateZ(${offset})` }}
        className={styles.forward}
      >
        {forward?.children}
      </div>

      <div
        style={{ transform: `translateZ(-${offset})` }}
        className={styles.back}
      >
        {back?.children}
      </div>
    </div>
  )
}

export default Box3D
