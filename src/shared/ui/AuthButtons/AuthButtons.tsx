'use client';

import React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import styles from './AuthButtons.module.css';

export function AuthButtons() {
  const t = useTranslations('Header');

  const locale = useLocale();

  return (
    <div className={styles.buttons}>
      <Link href={`/${locale}/signin`}>
        <button type="button">{t('sign-in')}</button>
      </Link>
      <Link href={`/${locale}/signup`}>
        <button type="button">{t('sign-up')}</button>
      </Link>
    </div>
  );
}
