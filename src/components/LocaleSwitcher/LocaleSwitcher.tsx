'use client';

import { useLocale, useTranslations } from 'next-intl';
import { locales } from '@/config/locales';
import { useRouter } from 'next/navigation';
import LocaleSwitcherSelector from '../LocaleSwitcherSelector/LocaleSwitcherSelector';

export default function LocaleSwitcher() {
  const t = useTranslations('Header');
  const locale = useLocale();
  const router = useRouter();

  const handleLocaleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = event.target.value;
    router.push(`/${newLocale}`);
  };

  return (
    <LocaleSwitcherSelector value={locale} onChange={handleLocaleChange}>
      {locales.map((cur) => (
        <option key={cur} value={cur}>
          {t(`langs.${cur}`)}
        </option>
      ))}
    </LocaleSwitcherSelector>
  );
}
