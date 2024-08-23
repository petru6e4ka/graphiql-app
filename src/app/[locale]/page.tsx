import Image from 'next/image';
import { useTranslations } from 'next-intl';
import styles from './page.module.css';
import LocaleSwitcher from '../../components/LocaleSwitcher/LocaleSwitcher';

export default function Home() {
  const t = useTranslations('Main');

  return (
    <main className={styles.main}>
      <div>
        <h1>{t('welcome-non-auth')}</h1>
      </div>
      <LocaleSwitcher />
      <Image className={styles.logo} src="/next.svg" alt="Next.js Logo" width={180} height={37} priority />
    </main>
  );
}
