import { useTranslations } from 'next-intl';
import {
  Title, Button, Select, TextInput, Group, JsonInput, Stack,
} from '@/shared/ui';

import styles from './Rest.module.css';

export default function Rest() {
  const t = useTranslations('REST');

  return (
    <div className={styles.rest}>
      <Title>{t('title')}</Title>

      <div className={styles.content}>
        <Title order={2}>Request data</Title>

        <Stack>
          <Group>
            <div className={styles.method}>
              <Select
                placeholder="Method"
                data={[
                  { value: 'GET', label: 'GET' },
                  { value: 'POST', label: 'POST' },
                  { value: 'DELETE', label: 'DELETE' },
                  { value: 'PUT', label: 'PUT' },
                  { value: 'PATCH', label: 'PATCH' },
                ]}
              />
            </div>
            <div className={styles.url}>
              <TextInput placeholder="URL" />
            </div>
          </Group>
          <JsonInput placeholder="Body" validationError="Invalid json" formatOnBlur autosize minRows={6} />
          <Button>Send</Button>
        </Stack>
      </div>
    </div>
  );
}
