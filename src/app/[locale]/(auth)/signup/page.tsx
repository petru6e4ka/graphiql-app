import { useTranslations } from 'next-intl';

import styles from './SignUp.module.css';

export default function SignIn() {
  const t = useTranslations('SignUp');

  return (
    <div className={styles.SignUp}>
      <h1>{t('title')}</h1>
    </div>
  );
}
