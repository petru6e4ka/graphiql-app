'use client';

import { useTranslations } from 'next-intl';
import { Group, Text, Title } from '@/shared/ui';
import styles from './StatusComponent.module.css';

export function StatusComponent({ status }: { status: string }) {
  const t = useTranslations('REST');

  return (
    <Group mb={15}>
      <Title className={styles.subtitle} order={4} mb={0}>
        {t('status')}
      </Title>
      <Text>{status}</Text>
    </Group>
  );
}
