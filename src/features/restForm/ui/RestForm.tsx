'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from '@mantine/form';
import { Button, Stack, Group, Select, TextInput, JsonInput, Text, Textarea } from '@/shared/ui';
import { stylesForFieldWithError } from '@/shared/lib/forms/stylesForFieldWithError';
import HeadersSection from '@/widgets/HeadersSection';
import { useHeaders, type Header } from '@/features/store/headersStore';
import { useQueryParams, type Query } from '@/features/store/queryParamsStore';
import { useHistoryStore } from '@/features/store/historyStore';
import { useRestRequest } from '@/features/store/restRequestStore';
import { urlCheck } from '@/shared/lib/forms/urlCheck';
import { isJsonString } from '@/shared/lib/forms/isJsonString';
import { showToast, ToastType } from '@/features/toast';
import { Method } from '@/shared/types/Method';
import { headerObjectToRecord } from '@/shared/lib/convert/headerObjToRecord';
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

type Props = {
  onSubmit: ({
    headers,
    query,
    method,
    body,
    url,
  }: {
    headers: Record<string, string>;
    query: Record<string, string>;
    method: Method;
    body: string;
    url: string;
  }) => void;
};

export function RestForm({ onSubmit }: Props) {
  const t = useTranslations('REST');
  const { body, url, method, clearData } = useRestRequest();

  const [bodyFormat, setBodyFormat] = useState(isJsonString(body) ? BodyFormat.JSON : BodyFormat.String);

  const { headers, addHeaderInStore, removeHeaderFromStore, updateHeaderInStore, cleanHeaders } = useHeaders();
  const { query, addQueryInStore, removeQueryFromStore, updateQueryInStore, cleanQuery } = useQueryParams();
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
      method: method || Request.GET,
      url: url || '',
      body: isJsonString(body) ? JSON.parse(body) : body,
    },
    validate: {
      url: urlCheck(t('invalid-url')),
      method: (value) => (Object.values(Request).includes(value as Request) ? null : t('invalid-metod')),
    },
    validateInputOnBlur: true,
  });

  const bodyInput =
    bodyFormat === BodyFormat.JSON ? (
      <JsonInput
        placeholder={t('body')}
        validationError={t('invalid-json')}
        formatOnBlur
        autosize
        minRows={6}
        {...form.getInputProps('body')}
        styles={stylesForFieldWithError}
        data-testid="json-area"
      />
    ) : (
      <Textarea
        placeholder={t('body')}
        autosize
        minRows={6}
        {...form.getInputProps('body')}
        styles={stylesForFieldWithError}
        data-testid="string-area"
      />
    );

  const clearForm = () => {
    cleanHeaders();
    cleanQuery();
    clearData();
    form.setValues({
      method: Request.GET,
      url: '',
      body: '',
    });
  };

  const addRequestToHistory = (data: typeof form.values, requestBody: string) => {
    addRequest({
      date: new Date().toUTCString(),
      url: data.url,
      method: data.method as Request,
      headers: headerObjectToRecord(headers),
      body: requestBody,
      searchParams: headerObjectToRecord(query),
    });
  };

  const makeRequest = (data: typeof form.values | null) => {
    if (data) {
      const requestBody = bodyFormat === BodyFormat.JSON ? JSON.stringify(data.body) : data.body;

      addRequestToHistory(data, requestBody);
      onSubmit({
        headers: headerObjectToRecord(headers),
        query: headerObjectToRecord(query),
        method: data.method || Request.GET,
        body: requestBody,
        url: data.url,
      });
    }

    // TODO: create endpoint url
  };

  const changeBodyFormatToStr = () => {
    setBodyFormat(BodyFormat.String);
  };

  const changeBodyFormatToJSON = () => {
    const values = form.getValues();

    if (isJsonString(values.body) || !values.body) {
      setBodyFormat(BodyFormat.JSON);
      return;
    }

    showToast(t('string-to-json-error'), ToastType.error);
  };

  return (
    <form onSubmit={form.onSubmit(makeRequest)} onReset={clearForm}>
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
          <Button variant={bodyFormat === BodyFormat.String ? 'light' : 'subtle'} onClick={changeBodyFormatToStr}>
            {t('string')}
          </Button>
          <Button variant={bodyFormat === BodyFormat.JSON ? 'light' : 'subtle'} onClick={changeBodyFormatToJSON}>
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
        <Button type="reset" variant="subtle">
          {t('reset')}
        </Button>
      </Stack>
    </form>
  );
}
