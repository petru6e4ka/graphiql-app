'use client';

import { locales } from '@/config/locales';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { ChangeEvent } from 'react';
import styles from './LocaleSwitcher.module.css';

export function LocaleSwitcher() {
  const t = useTranslations('Header');
  const locale = useLocale();
  const router = useRouter();

  const handleLocaleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newLocale = event.target.value;
    router.push(`/${newLocale}`);
  };

  return (
    <div className={styles.languageSwitcher}>
      <select id="locale-switcher" data-testid="locale-switcher" value={locale} onChange={handleLocaleChange}>
        {locales.map((cur) => (
          <option key={cur} value={cur}>
            {t(`langs.${cur}`)}
          </option>
        ))}
      </select>
    </div>
  );
}

export default LocaleSwitcher;
