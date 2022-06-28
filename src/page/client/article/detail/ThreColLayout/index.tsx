import type { ReactElement } from 'react';

import styles from './index.module.less';
import mergeClassName from '@/utils/mergeClassName';

interface IProps {
  left: ReactElement;
  main: ReactElement;
  right: ReactElement;
  className?: string;
}
const ThreeColLayout: React.FC<IProps> = ({ left, right, main, className = '' }) => {
  return (
    <div className={mergeClassName(styles.wrapper, className)}>
      <div className={styles.left}>
        {left}
      </div>
      <div className={styles.main}>
        {main}
      </div>
      <div className={styles.right}>
        {right}
      </div>
    </div>
  );
};

export default ThreeColLayout;