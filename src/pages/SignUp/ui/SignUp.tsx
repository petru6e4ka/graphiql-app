// import { Flex } from 'antd';
// import { Typography } from 'antd';
import Flex from 'antd/es/flex';
import Title from 'antd/es/typography/Title';
import styles from './SignUp.module.css';

// const { Title } = Typography;

export function SignUp() {
  return (
    <div className={styles.SignUp}>
      <Flex gap="middle" vertical>
        <Title>Sign up</Title>
      </Flex>
    </div>
  );
}

export default SignUp;
