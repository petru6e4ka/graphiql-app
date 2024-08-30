'use client';

import { useTranslations } from 'next-intl';
import {
  Title, Text, Group, Button,
} from '@/shared/ui';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import styles from './Welcome.module.css';

export default function Welcome({ params: locale }: { params: { locale: string } }) {
  const t = useTranslations('Main');
  const { data: session } = useSession();
  const router = useRouter();

  const userName = `${t('hello')}, ${session?.user?.name ? session.user.name : t('user')}!`;

  return (
    <div className={styles.Inner}>
      <div className={styles.Image}>{t('welcome-image')}</div>
      <div className={styles.Content}>
        <Title className={styles.Title}>{session?.user ? userName : t('welcome-title')}</Title>
        <Text c="dimmed" size="lg" ta="center" className={styles.Description}>
          {session?.user ? t('welcome-text-user') : t('welcome-text')}
        </Text>
        {session?.user ? (
          <Group justify="center">
            <Button
              size="md"
              onClick={() => {
                router.push(`${locale.locale}/rest`);
              }}
            >
              {t('rest')}
            </Button>
            <Button
              size="md"
              onClick={() => {
                router.push(`${locale.locale}/graphiql`);
              }}
            >
              {t('graphiql')}
            </Button>
          </Group>
        ) : (
          <Group justify="center">
            <Button
              size="md"
              variant="outline"
              onClick={() => {
                router.push(`${locale.locale}/signup`);
              }}
            >
              {t('sign-up')}
            </Button>
            <Button
              size="md"
              onClick={() => {
                router.push(`${locale.locale}/signin`);
              }}
            >
              {t('sign-in')}
            </Button>
          </Group>
        )}
      </div>
    </div>
  );
}
