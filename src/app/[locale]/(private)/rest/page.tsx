import { useTranslations } from 'next-intl';
import { Title, Button } from '@/shared/ui';

import styles from './Rest.module.css';

export default function Rest() {
  const t = useTranslations('REST');

  return (
    <div className={styles.rest}>
      <Title>{t('title')}</Title>
      <Button>Hello world</Button>
    </div>
  );
}
