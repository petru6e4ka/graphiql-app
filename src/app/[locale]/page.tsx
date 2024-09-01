import { useTranslations } from 'next-intl';

import { AuthButtons } from '@/shared/ui/AuthButtons/AuthButtons';
import styles from './Welcome.module.css';

export default function Welcome() {
  const t = useTranslations('Main');

  // для проверки Error Boundary
  // const handleError = () => {
  //   throw new Error ('error');
  // }

  return (
    <div className={styles.Welcome}>
      <h1>{t('welcome-non-auth')}</h1>
      <AuthButtons />
      {/* <button type='button' onSubmit={handleError}>make error</button> */}
    </div>
  );
}
