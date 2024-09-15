import { useTranslations } from 'next-intl';
import { Link } from '@/features/localeSwitcher';
import { Container, Title, Text, Button, Group, NotFoundIcon } from '@/shared/ui';
import styles from './NotFound.module.css';

export default function NotFoundPage({ reset }: { reset: () => void }) {
  const t = useTranslations('Error.404');

  return (
    <Container className={styles.root}>
      <div className={styles.inner}>
        <NotFoundIcon className={styles.image} />
        <div className={styles.content}>
          <Title className={styles.title} data-testid="NotFoundTitle">
            {t('title')}
          </Title>
          <Text c="dimmed" size="lg" ta="center" className={styles.description} data-testid="NotFoundTitle">
            {t('heading')}
          </Text>
          <Link href="/">
            <Group justify="center">
              <Button size="md" onClick={reset} color="var(--mantine-color-teal-filled)">
                {t('back')}
              </Button>
            </Group>
          </Link>
        </div>
      </div>
    </Container>
  );
}
