import { useTranslations } from 'next-intl';
import { Title } from '@mantine/core';

import styles from './Rest.module.css';

export default function Rest() {
  const t = useTranslations('REST');

  return (
    <div className={styles.Rest}>
      <Title>{t('title')}</Title>
    </div>
  );
}
