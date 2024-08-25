'use client';

import Title from 'antd/es/typography/Title';
import { Flex } from 'antd';
import type { FormProps } from 'antd';
import { useAuth } from '@/app/_providers/auth';
import { SignForm, FieldType } from '@/widgets/sign-form';
import styles from './SignUp.module.css';

export function SignUp() {
  const { googleSignUp } = useAuth();

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const signUpEmail = values.email as string;
    const signUpPassword = values.password as string;

    googleSignUp(signUpEmail, signUpPassword);
  };

  return (
    <div className={styles.SignUp}>
      <Flex gap="middle" vertical>
        <Title>Sign up</Title>
        <SignForm onFinish={onFinish} />
      </Flex>
    </div>
  );
}

export default SignUp;
