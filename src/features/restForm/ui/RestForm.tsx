'use client';

import { useState } from 'react';
import {
  Button, Stack, Group, Select, TextInput, JsonInput, Text, Textarea,
} from '@/shared/ui';
import { stylesForFieldWithError } from '@/shared/lib/forms/stylesForFieldWithError';
import HeadersSection from '@/widgets/HeadersSection';
import styles from './RestForm.module.css';

enum Request {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

enum BodyFormat {
  JSON,
  String,
}

export function RestForm() {
  const [bodyFormat, setBodyFormat] = useState(BodyFormat.JSON);

  const bodyInput = bodyFormat === BodyFormat.JSON ? (
    <JsonInput placeholder="Body" validationError="Invalid json" formatOnBlur autosize minRows={6} styles={stylesForFieldWithError} />
  ) : (
    <Textarea placeholder="Body" autosize minRows={6} styles={stylesForFieldWithError} />
  );

  return (
    <Stack>
      <Group>
        <div className={styles.method}>
          <Select
            label="Method"
            defaultValue={Request.GET}
            placeholder="Method"
            data={Object.values(Request).map((elem) => ({
              value: elem,
              label: elem,
            }))}
            comboboxProps={{ transitionProps: { transition: 'pop', duration: 200 }, withinPortal: false }}
          />
        </div>
        <div className={styles.url}>
          <TextInput placeholder="URL" label="URL" />
        </div>
      </Group>
      <Group>
        <Text size="md">Body format: </Text>
        <Button variant={bodyFormat === BodyFormat.String ? 'light' : 'subtle'} onClick={() => setBodyFormat(BodyFormat.String)}>
          String
        </Button>
        <Button variant={bodyFormat === BodyFormat.JSON ? 'light' : 'subtle'} onClick={() => setBodyFormat(BodyFormat.JSON)}>
          JSON
        </Button>
      </Group>
      <div className={styles.body}>{bodyInput}</div>

      <HeadersSection>
        <Text>Headers: </Text>
      </HeadersSection>

      <HeadersSection>
        <Text>Query: </Text>
      </HeadersSection>

      <Button>Send</Button>
    </Stack>
  );
}
