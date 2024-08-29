import { useTranslations } from 'next-intl';
import { Title, Button } from '@/shared/ui';

import styles from './Rest.module.css';

export default async function Rest() {
  const t = useTranslations('REST');

  return (
    <div className={styles.Rest}>
      <Title>{t('title')}</Title>
      <Button>Hello world</Button>
    </div>
  );
}
