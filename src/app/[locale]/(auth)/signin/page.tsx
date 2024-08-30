'use client';

import { useTranslations } from 'next-intl';
import { signIn } from 'next-auth/react';
import styles from './SignIn.module.css';

export default function SignIn({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations('SignIn');

  return (
    <div className={styles.SignIn}>
      <h1>{t('title')}</h1>

      <button onClick={() => signIn('google', { callbackUrl: `/${locale}`, redirect: true })} type="button">
        Login with Google
      </button>
    </div>
  );
}
