'use client';

import Title from 'antd/es/typography/Title';
import { Flex } from 'antd';
import type { FormProps } from 'antd';
import { useAuth } from '@/app/_providers/auth';
import { SignForm, FieldType } from '@/widgets/sign-form';
import styles from './SignIn.module.css';

export function SignIn() {
  const { googleSignIn } = useAuth();

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const signUpEmail = values.email as string;
    const signUpPassword = values.password as string;

    googleSignIn(signUpEmail, signUpPassword);
  };

  return (
    <div className={styles.SignIn}>
      <Flex gap="middle" vertical>
        <Title>Sign in</Title>
        <SignForm onFinish={onFinish} />
      </Flex>
    </div>
  );
}

export default SignIn;
