'use client';

import { useEffect, useState } from 'react';
import { Title, Button, Divider, Stack, Text, Box, Textarea } from '@/shared/ui';
import { useTranslations } from 'next-intl';
import HeadersSection from '@/widgets/HeadersSection';
import EndpointUrl from '@/widgets/EndpointUrl';
import StatusComponent from '@/widgets/StatusComponent';
import ResponseBody from '@/widgets/ResponseBody';
import DocumentationComponent from '@/widgets/DocumentationComponent';
import { useGraphHeaders, type Header } from '@/features/store/graphHeaders';
import { useGraphQueryParams, type Query } from '@/features/store/graphQueryParamsStore';
import prettier from 'prettier/standalone';
import parserGraphql from 'prettier/parser-graphql';
import { useHistoryStore } from '@/features/store/historyStore';

const base64Encode = (str: string) => btoa(unescape(encodeURIComponent(str)));

export default function GraphiQLClient() {
  const t = useTranslations('GraphiQL');
  const { addRequest } = useHistoryStore();

  const [url, setUrl] = useState('https://swapi-graphql.netlify.app/.netlify/functions/index');
  const [docUrl, setDocUrl] = useState('');
  const [loadingDoc, setLoadingDoc] = useState(false);
  const [queryData, setQueryData] = useState('');
  const [response, setResponse] = useState('');
  const [status, setStatus] = useState('');
  const [documentation, setDocumentation] = useState('');
  const { headers, addHeaderInStore, removeHeaderFromStore, updateHeaderInStore } = useGraphHeaders();
  const { query, addQueryInStore, removeQueryFromStore, updateQueryInStore } = useGraphQueryParams();

  const addNewHeader = (item: object) => {
    addHeaderInStore(item as Header);
  };

  const addNewQuery = (item: object) => {
    const q = item as Query;
    if (typeof q.value !== 'string') {
      q.value = String(q.value);
    }
    addQueryInStore(q as Query);
  };

  const updateHeader = (item: object) => {
    updateHeaderInStore(item as Header);
  };

  const headersToQueryParams = (headerObject: Record<string, string>) =>
    Object.entries(headerObject)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');

  const getHeadersObject = () =>
    headers.reduce(
      (acc, header) => {
        if (header.name && header.value) {
          return { ...acc, [header.name]: header.value };
        }
        return acc;
      },
      {} as Record<string, string>,
    );

  const generateUrlWithHeaders = () => {
    const encodedEndpoint = base64Encode(url);
    const encodedQuery = base64Encode(queryData);
    const headersQueryParams = headersToQueryParams(getHeadersObject());

    return `/${encodedEndpoint}/${encodedQuery}?${headersQueryParams}`;
  };

  const updateQuery = (item: object) => {
    const q = item as Query;
    if (typeof q.value !== 'string') {
      q.value = String(q.value);
    }
    updateQueryInStore(q as Query);
  };

  const fetchDocumentation = () => {
    setLoadingDoc(true);
    fetch(docUrl)
      .then((res) => res.text())
      .then((data) => setDocumentation(data))
      .catch((error) => setDocumentation(`Error fetching documentation: ${error.message}`))
      .finally(() => setLoadingDoc(false));
  };

  useEffect(() => {
    if (!docUrl || docUrl === url) {
      setDocUrl(`${url}?sdl`);
    }
    fetchDocumentation();
  }, [url]);

  const handleQueryChange = async (newQuery: string) => {
    try {
      const formattedQuery = prettier.format(newQuery, {
        parser: 'graphql',
        plugins: [parserGraphql],
      });
      setQueryData(await formattedQuery);
    } catch (error) {
      setQueryData(newQuery);
    }
  };

  const makeRequest = async (queryInput: string, variablesInput: Record<string, string>, headersInput: Record<string, string>) => {
    try {
      const fetchResponse = await fetch(url, {
        method: 'POST',
        headers: {
          ...headersInput,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: queryInput, variables: variablesInput }),
      });

      const result = await fetchResponse.json();

      if (result.errors) {
        return {
          data: result,
          status: '400',
        };
      }

      return {
        data: result,
        status: fetchResponse.status.toString(),
      };
    } catch (error) {
      return {
        data: { error: 'Network or other error occurred' },
        status: '500',
      };
    }
  };

  const go = () => {
    const generatedUrl = generateUrlWithHeaders();
    const currentPath = window.location.pathname;
    window.history.pushState({}, '', `${currentPath}${generatedUrl}`);

    const headersObject = getHeadersObject();
    const variablesObject = query.reduce(
      (accumulator, { name, value }) => {
        if (name && value) {
          return { ...accumulator, [name]: value };
        }
        return accumulator;
      },
      {} as Record<string, string>,
    );

    makeRequest(queryData, variablesObject, headersObject).then((result) => {
      setResponse(JSON.stringify(result.data, null, 2));
      setStatus(result.status.toString() || 'Unknown');
    });

    addRequest({
      date: new Date().toUTCString(),
      url,
      method: 'GRAPHQL',
      headers: headersObject,
      queryGraphQL: query,
      variablesGraphQL: variables,
    });
  };

  return (
    <div>
      <Title>{t('title')}</Title>
      <EndpointUrl url={url} setUrl={setUrl} docUrl={docUrl} setDocUrl={setDocUrl} fetchDocumentation={fetchDocumentation} />

      <HeadersSection add={addNewHeader} remove={removeHeaderFromStore} update={updateHeader} items={headers}>
        <Text>{t('headers')}</Text>
      </HeadersSection>

      <Divider my="md" />
      <Box mb="md">
        <Textarea label={t('query')} placeholder={t('queryPH')} value={queryData} onChange={(e) => handleQueryChange(e.target.value)} rows={6} />
        <HeadersSection add={addNewQuery} remove={removeQueryFromStore} update={updateQuery} items={query}>
          <Text>{t('variables')}</Text>
        </HeadersSection>
      </Box>
      <Button onClick={go} mb="md">
        {t('submit')}
      </Button>

      <Stack>
        <Title mb={15} order={2}>
          {t('response')}
        </Title>

        <StatusComponent status={status} />

        <ResponseBody response={response} />
      </Stack>

      {loadingDoc ? <Text>Loading documentation...</Text> : documentation && <DocumentationComponent documentation={documentation} />}
    </div>
  );
}
