'use client';

import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

import styles from './AuthSwitcher.module.css';

export function AuthSwitcher({ locale }: { locale: string }) {
  const { data: session, status } = useSession();

  const onSignOut = () => {
    signOut();
  };

  const isLoggedIn = status === 'authenticated';

  if (isLoggedIn) {
    return (
      <div className={styles.AuthSwitcher}>
        <p>{session?.user?.name}</p>
        <button type="button" onClick={onSignOut}>
          Log out
        </button>
      </div>
    );
  }

  return (
    <div className={styles.AuthSwitcher}>
      <Link href={`/${locale}/signin`}>Sign in</Link>
      <Link href={`/${locale}/signup`}>Sign up</Link>
    </div>
  );
}

export default AuthSwitcher;
