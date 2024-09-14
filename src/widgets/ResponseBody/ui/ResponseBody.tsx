'use client';

import { Box, Title, ScrollArea } from '@/shared/ui';
import styles from './ResponseBody.module.css';

export function ResponseBody({ response }: { response: string }) {
  return (
    <Box mb="md">
      <Title className={styles.subtitle} order={4}>
        Body:
      </Title>
      <ScrollArea h={250}>{response}</ScrollArea>
    </Box>
  );
}
