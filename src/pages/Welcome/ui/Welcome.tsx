'use client';

import Link from 'next/link';
import { Button } from 'antd';
import { useAuth } from '@/app/_providers/auth';
import styles from './Welcome.module.css';

export function Welcome({
  params: { locale },
}: {
  params: {
    locale: string;
  };
}) {
  const { user, logOut } = useAuth();

  const onLogout = () => {
    logOut();
  };

  return (
    <>
      <h1 className={styles.Welcome}>Welcome</h1>

      {user ? (
        <Button type="primary" htmlType="button" onClick={onLogout}>
          Logout
        </Button>
      ) : (
        <div>
          <Link href={`/${locale}/signin`}>Sign in</Link>
          <br />
          <Link href={`/${locale}/signup`}>Sign up</Link>
        </div>
      )}
    </>
  );
}

export default Welcome;
