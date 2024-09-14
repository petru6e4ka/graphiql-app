'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from '@mantine/form';
import {
  Button, Stack, Group, Select, TextInput, JsonInput, Text, Textarea,
} from '@/shared/ui';
import { stylesForFieldWithError } from '@/shared/lib/forms/stylesForFieldWithError';
import HeadersSection from '@/widgets/HeadersSection';
import { useHeaders, type Header } from '@/features/store/headersStore';
import { useQueryParams, type Query } from '@/features/store/queryParamsStore';
import { useHistoryStore } from '@/features/store/historyStore';
import { urlCheck } from '@/shared/lib/forms/urlCheck';
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
  const t = useTranslations('REST');
  const [bodyFormat, setBodyFormat] = useState(BodyFormat.JSON);

  const {
    headers, addHeaderInStore, removeHeaderFromStore, updateHeaderInStore,
  } = useHeaders();
  const {
    query, addQueryInStore, removeQueryFromStore, updateQueryInStore,
  } = useQueryParams();
  const { addRequest } = useHistoryStore();

  const addNewHeader = (item: object) => {
    addHeaderInStore(item as Header);
  };

  const addNewQuery = (item: object) => {
    addQueryInStore(item as Query);
  };

  const updateHeader = (item: object) => {
    updateHeaderInStore(item as Header);
  };

  const updateQuery = (item: object) => {
    updateQueryInStore(item as Query);
  };

  const form = useForm({
    mode: 'controlled',
    initialValues: {
      method: '',
      url: '',
      body: '',
    },
    validate: {
      url: urlCheck(t('invalid-url')),
      method: (value) => (Object.values(Request).includes(value as Request) ? null : t('invalid-metod')),
    },
    validateInputOnBlur: true,
  });

  const bodyInput = bodyFormat === BodyFormat.JSON ? (
    <JsonInput
      placeholder={t('body')}
      validationError={t('invalid-json')}
      formatOnBlur
      autosize
      minRows={6}
      {...form.getInputProps('body')}
      styles={stylesForFieldWithError}
    />
  ) : (
    <Textarea placeholder={t('body')} autosize minRows={6} {...form.getInputProps('body')} styles={stylesForFieldWithError} />
  );

  const makeRequest = (data: typeof form.values | null) => {
    // console.log(data);

    if (data) {
      const { method, url, body } = data;

      const requestBody = bodyFormat === BodyFormat.JSON ? JSON.stringify(body) : body;

      addRequest({
        date: new Date().toUTCString(),
        url,
        method: method as Request,
        headers: headers.reduce(
          (prev, curr) => ({
            ...prev,
            [curr.name]: curr.value,
          }),
          {},
        ),
        body: requestBody,
        searchParams: query.reduce(
          (prev, curr) => ({
            ...prev,
            [curr.name]: curr.value,
          }),
          {},
        ),
      });
    }

    // TODO: create endpoint url
    // TODO: make request and show it
  };

  return (
    <form onSubmit={form.onSubmit(makeRequest)}>
      <Stack>
        <Group mb={15}>
          <div className={styles.method}>
            <Select
              label={t('method')}
              defaultValue={Request.GET}
              placeholder={t('method')}
              data={Object.values(Request).map((elem) => ({
                value: elem,
                label: elem,
              }))}
              comboboxProps={{ transitionProps: { transition: 'pop', duration: 200 }, withinPortal: false }}
              required
              {...form.getInputProps('method')}
              styles={stylesForFieldWithError}
            />
          </div>
          <div className={styles.url}>
            <TextInput placeholder={t('url')} label={t('url')} required {...form.getInputProps('url')} styles={stylesForFieldWithError} />
          </div>
        </Group>
        <Group>
          <Text size="md">{t('body-format')}</Text>
          <Button variant={bodyFormat === BodyFormat.String ? 'light' : 'subtle'} onClick={() => setBodyFormat(BodyFormat.String)}>
            {t('string')}
          </Button>
          <Button variant={bodyFormat === BodyFormat.JSON ? 'light' : 'subtle'} onClick={() => setBodyFormat(BodyFormat.JSON)}>
            JSON
          </Button>
        </Group>
        <div className={styles.body}>{bodyInput}</div>

        <HeadersSection add={addNewHeader} remove={removeHeaderFromStore} update={updateHeader} items={headers}>
          <Text>{t('headers')}</Text>
        </HeadersSection>

        <HeadersSection add={addNewQuery} remove={removeQueryFromStore} update={updateQuery} items={query}>
          <Text>{t('query')}</Text>
        </HeadersSection>

        <Button type="submit">{t('send')}</Button>
      </Stack>
    </form>
  );
}
