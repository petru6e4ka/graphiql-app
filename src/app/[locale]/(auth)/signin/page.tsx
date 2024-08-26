import { useTranslations } from 'next-intl';

import styles from './SignIn.module.css';

export default function SignIn() {
  const t = useTranslations('SignIn');

  return (
    <div className={styles.SignIn}>
      <h1>{t('title')}</h1>
    </div>
  );
}
