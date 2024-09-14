import { useRouter } from '@/features/localeSwitcher';
import { useTranslations } from 'next-intl';
import { Button, Group, Text } from '@/shared/ui';
import styles from './EmptyHistory.module.css';

export function EmptyHistory() {
  const t = useTranslations('History');
  const router = useRouter();

  return (
    <>
      <Text c="dimmed" size="lg" ta="center" className={styles.description} mb={20}>
        {t('not-history')}
      </Text>

      <Group justify="center">
        <Button
          size="md"
          onClick={() => {
            router.push('/rest');
          }}
        >
          {t('rest')}
        </Button>
        <Button
          size="md"
          onClick={() => {
            router.push('/graphiql');
          }}
        >
          {t('graphiql')}
        </Button>
      </Group>
    </>
  );
}
