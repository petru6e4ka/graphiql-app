import { useTranslations } from 'next-intl';
import styles from './Rest.module.css';

export default async function Rest() {
  const t = useTranslations('REST');

  return (
    <div className={styles.Rest}>
      <h1>{t('title')}</h1>
    </div>
  );
}
