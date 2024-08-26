import { useTranslations } from 'next-intl';

import styles from './Welcome.module.css';

export default function Welcome() {
  const t = useTranslations('Main');

  return (
    <div className={styles.Welcome}>
      <h1>{t('welcome-non-auth')}</h1>
    </div>
  );
}
