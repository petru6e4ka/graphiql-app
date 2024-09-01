import { useTranslations } from 'next-intl';
import React from 'react';
import ToastButton from '@/features/toast/ui/ToastButton';
import styles from './SignIn.module.css';

export default function SignIn() {
  const name = 'SignIn';
  const t = useTranslations(name);

  return (
    <div className={styles.SignIn}>
      <h1>{t('title')}</h1>
      <ToastButton name={name} />
    </div>
  );
}
