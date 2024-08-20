import Image from 'next/image';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <div>
        <h1>Home</h1>
      </div>
      <Image className={styles.logo} src="/next.svg" alt="Next.js Logo" width={180} height={37} priority />
    </main>
  );
}
