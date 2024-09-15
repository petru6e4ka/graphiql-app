'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Method } from '@/shared/types/Method';
import { Title, Stack, Loader } from '@/shared/ui';
import RestForm from '@/features/restForm';
import ResponseBody from '@/widgets/ResponseBody';
import StatusComponent from '@/widgets/StatusComponent';
import styles from './Rest.module.css';

type Response = { status: number; body: string };
type Error = { status: number; body: string };

export default function Rest() {
  const t = useTranslations('REST');

  const [error, setError] = useState<null | Error>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<null | Response>(null);

  const fetchData = async ({
    url,
    headers,
    query,
    method,
    body,
  }: {
    url: string;
    headers: Record<string, string>;
    query: Record<string, string>;
    method: Method;
    body: string;
  }) => {
    try {
      setError(null);
      setData(null);
      setIsLoading(true);

      const generatedHeaders = new Headers(headers);
      const generateQuery = new URLSearchParams(query);
      const generateRequestOptions = method === 'GET'
        ? {
          method,
          headers: generatedHeaders,
        }
        : {
          body,
          method,
          headers: generatedHeaders,
        };
      const generatedUrl = generateQuery.toString().trim() ? `${url}?${generateQuery}` : url;

      const response = await fetch(generatedUrl, generateRequestOptions);
      const responseBody = await response.text();

      if (!response.ok) {
        setError({
          body: responseBody,
          status: response.status,
        });

        return;
      }

      setData({
        status: response.status,
        body: responseBody,
      });
    } catch (err) {
      setError({
        body: 'Something went wrong',
        status: 0,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const showLoader = isLoading && !error && !data && <Loader color="teal" />;

  const showError = !isLoading && !data && error && (
    <>
      <StatusComponent status={error?.status ? String(error.status) : ''} />

      <ResponseBody response={error?.body ? error.body : ''} />
    </>
  );

  const showResponse = !isLoading && !error && data && (
    <>
      <StatusComponent status={data?.status ? String(data?.status) : ''} />

      <ResponseBody response={data?.body ? data.body : ''} />
    </>
  );

  return (
    <div className={styles.rest}>
      <Title className={styles.header}>{t('title')}</Title>

      <div className={styles.content}>
        <Title className={styles.subtitle} order={2}>
          {t('request-data')}
        </Title>

        <div className={styles.form}>
          <RestForm onSubmit={fetchData} />
        </div>

        <Stack>
          <Title className={styles.subtitle} order={2}>
            {t('response')}
          </Title>

          {showLoader}

          {showResponse}

          {showError}
        </Stack>
      </div>
    </div>
  );
}
