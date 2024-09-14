'use client';

import { Group, Text, Title } from '@/shared/ui';
import styles from './StatusComponent.module.css';

export function StatusComponent({ status }: { status: string }) {
  return (
    <Group mb={15}>
      <Title className={styles.subtitle} order={4} mb={0}>
        Status:
      </Title>
      <Text>{`HTTP Status Code: ${status}`}</Text>
    </Group>
  );
}
