'use client';

import { locales } from '@/features/localeSwitcher/config/locales';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import Flag from 'react-flagkit';
import { Select, SelectProps, Group } from '@mantine/core';

export function LocaleSwitcher() {
  const t = useTranslations('Header');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: string | null) => {
    if (newLocale) {
      router.push(pathname.replace(locale, newLocale));
    }
  };

  const iconProps = {
    size: 16,
  };

  const icons: Record<string, React.ReactNode> = {
    de: <Flag country="DE" {...iconProps} />,
    en: <Flag country="US" {...iconProps} />,
    ru: <Flag country="RU" {...iconProps} />,
  };

  const renderSelectOption: SelectProps['renderOption'] = ({ option }) => (
    <Group flex="1" gap="xs">
      {icons[option.value]}
      {option.label}
    </Group>
  );

  return (
    <Select
      size="md"
      value={locale}
      onChange={handleLocaleChange}
      data={locales.map((cur) => ({
        value: cur,
        label: t(`langs.${cur}`),
      }))}
      renderOption={renderSelectOption}
      comboboxProps={{ transitionProps: { transition: 'pop', duration: 200 } }}
    />
  );
}
