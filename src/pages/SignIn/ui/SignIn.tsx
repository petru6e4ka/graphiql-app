// import { Flex } from 'antd';
// import { Typography } from 'antd';
import Flex from 'antd/es/flex';
import Title from 'antd/es/typography/Title';
import styles from './SignIn.module.css';

// const { Title } = Typography;

export function SignIn() {
  return (
    <div className={styles.SignIn}>
      <Flex gap="middle" vertical>
        <Title>Sign in</Title>
      </Flex>
    </div>
  );
}

export default SignIn;
