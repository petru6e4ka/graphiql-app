import Flex from 'antd/es/flex';
import Title from 'antd/es/typography/Title';

import styles from './Welcome.module.css';

export function Welcome() {
  return (
    <div className={styles.Welcome}>
      <Flex gap="middle" vertical>
        <Title>Welcome</Title>
      </Flex>
    </div>
  );
}

export default Welcome;
