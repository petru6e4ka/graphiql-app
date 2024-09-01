import { useTranslations } from 'next-intl';
import React from 'react';
import ToastButton from '@/features/toast/ui/ToastButton';
import styles from './SignUp.module.css';

export default function SignUp() {
  const name = 'SignUp';
  const t = useTranslations(name);

  return (
    <div className={styles.SignUp}>
      <h1>{t('title')}</h1>
      <ToastButton name={name} />
    </div>
  );
}
