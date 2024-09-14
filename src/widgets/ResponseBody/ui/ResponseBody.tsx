'use client';

import { useTranslations } from 'next-intl';
import { Box, Title, ScrollArea } from '@/shared/ui';
import styles from './ResponseBody.module.css';

export function ResponseBody({ response }: { response: string }) {
  const t = useTranslations('REST');

  return (
    <Box mb="md">
      <Title className={styles.subtitle} order={4}>
        {t('body')}
      </Title>
      <ScrollArea h={250}>{response}</ScrollArea>
    </Box>
  );
}
