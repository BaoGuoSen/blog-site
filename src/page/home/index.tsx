import useAsync from '../../hooks/useAsync';
import { getUsers } from '../../service/user';
import styles from "./index.module.less";

const Index = () => {
  const { value = [] } = useAsync(getUsers);

  return (
    <div className={styles.container}>
      {
        value.map(({ id }) => {
          return <div key={id}>{id}</div>;
        })
      }
      <div className={styles.test}>test</div>
    </div>
  );
};

export default Index;
