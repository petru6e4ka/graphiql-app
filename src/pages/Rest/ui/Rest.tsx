// import { Flex } from 'antd';
// import { Typography } from 'antd';
import Flex from 'antd/es/flex';
import Title from 'antd/es/typography/Title';
import styles from './Rest.module.css';

// const { Title } = Typography;

export function Rest() {
  return (
    <div className={styles.Rest}>
      <Flex gap="middle" vertical>
        <Title>Rest Client</Title>
      </Flex>
    </div>
  );
}

export default Rest;
