'use client';

import { Textarea, Box } from '@mantine/core';
import styles from './ResponseBody.module.css';

export function ResponseBody({ response }: { response: string }) {
  return (
    <Box mb="md">
      <Textarea
        label="Body"
        className={styles.textarea}
        placeholder="Read-Only JSON Viewer"
        value={response}
        readOnly
        h={200}
        styles={{ wrapper: { height: '100%' }, input: { height: '100%' } }}
      />
    </Box>
  );
}
