import { useTranslations } from 'next-intl';
import {
  ScrollArea, Title, Text, Stack, Group,
} from '@/shared/ui';
import RestForm from '@/features/restForm';
import styles from './Rest.module.css';

export default function Rest() {
  const t = useTranslations('REST');

  return (
    <div className={styles.rest}>
      <Title className={styles.header}>{t('title')}</Title>

      <div className={styles.content}>
        <Title className={styles.subtitle} order={2}>
          Request data:
        </Title>

        <div className={styles.form}>
          <RestForm />
        </div>

        <Stack>
          <Title className={styles.subtitle} order={2}>
            Response:
          </Title>

          <Group mb={15}>
            <Title className={styles.subtitle} order={4} mb={0}>
              Status:
            </Title>
            <Text>status</Text>
          </Group>

          <Title className={styles.subtitle} order={4}>
            Body:
          </Title>
          <ScrollArea h={250}>body</ScrollArea>
        </Stack>
      </div>
    </div>
  );
}
