'use client';

import { useEffect, useState } from 'react';
import {
  Title, Button, Divider, Stack, Text,
} from '@/shared/ui';
import { useTranslations } from 'next-intl';
import HeadersSection from '@/widgets/HeadersSection';
import EndpointUrl from '@/widgets/EndpointUrl';
import QueryComponent from '@/widgets/QueryComponent';
import StatusComponent from '@/widgets/StatusComponent';
import ResponseBody from '@/widgets/ResponseBody';
import DocumentationComponent from '@/widgets/DocumentationComponent';
import { useGraphHeaders, type Header } from '@/features/store/graphHeaders';
import prettier from 'prettier/standalone';
import parserGraphql from 'prettier/parser-graphql';
import { headerObjectToRecord } from '@/shared/lib/convert/headerObjToRecord';
import styles from './graphql.module.css';

const base64Encode = (str: string) => btoa(unescape(encodeURIComponent(str)));

export default function GraphiQLClient() {
  const t = useTranslations('GraphiQL');

  const [url, setUrl] = useState('https://swapi-graphql.netlify.app/.netlify/functions/index');
  const [docUrl, setDocUrl] = useState('');
  const [query, setQuery] = useState('');
  const [variables, setVariables] = useState('{}');
  const [response, setResponse] = useState('');
  const [status, setStatus] = useState('');
  const [documentation, setDocumentation] = useState('');
  const {
    headers, addHeaderInStore, removeHeaderFromStore, updateHeaderInStore,
  } = useGraphHeaders();

  const addNewHeader = (item: object) => {
    addHeaderInStore(item as Header);
  };

  const updateHeader = (item: object) => {
    updateHeaderInStore(item as Header);
  };

  useEffect(() => {
    if (!docUrl || docUrl === url) {
      setDocUrl(`${url}?sdl`);
    }
  }, [url]);

  const getHeadersObject = () => headerObjectToRecord(headers);

  const headersToQueryParams = (allHeaders: Record<string, string>) => Object.entries(allHeaders)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');

  const handleQueryChange = async (newQuery: string) => {
    try {
      const formattedQuery = prettier.format(newQuery, {
        parser: 'graphql',
        plugins: [parserGraphql],
      });
      setQuery(await formattedQuery);
    } catch (error) {
      setQuery(newQuery);
    }
  };

  const generateUrlWithHeaders = () => {
    const encodedEndpoint = base64Encode(url);
    const encodedQuery = base64Encode(JSON.stringify({ query, variables: JSON.parse(variables) }));
    const headersObject = getHeadersObject();
    const headersQueryParams = headersToQueryParams(headersObject);

    return `/${encodedEndpoint}/${encodedQuery}?${headersQueryParams}`;
  };

  const fetchDocumentation = () => {
    fetch(docUrl)
      .then((res) => res.text())
      .then((data) => setDocumentation(data))
      .catch((error) => setDocumentation(`Error fetching documentation: ${error.message}`));
  };

  const makeRequest = async (queryInput: string, variablesInput: string, headersInput: Record<string, string>) => {
    try {
      const parsedVariables = JSON.parse(variablesInput);

      return await fetch(url, {
        method: 'POST',
        headers: {
          ...headersInput,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: queryInput, variables: parsedVariables }),
      }).then((res) => res.json().then((data) => ({
        data,
        status: res.status,
      })));
    } catch (error) {
      return Promise.resolve({
        data: { error: 'Invalid variables format' },
        status: '400',
      });
    }
  };

  const go = () => {
    const generatedUrl = generateUrlWithHeaders();
    const currentPath = window.location.pathname;
    window.history.pushState({}, '', `${currentPath}${generatedUrl}`);

    const headersObject = getHeadersObject();
    makeRequest(query, variables, headersObject).then((result) => {
      setResponse(JSON.stringify(result.data, null, 2));
      setStatus(result.status.toString() || 'Unknown');
    });
  };

  return (
    <div className={styles.graphql}>
      <Title className={styles.header}>{t('title')}</Title>
      <EndpointUrl url={url} setUrl={setUrl} docUrl={docUrl} setDocUrl={setDocUrl} fetchDocumentation={fetchDocumentation} />

      <HeadersSection add={addNewHeader} remove={removeHeaderFromStore} update={updateHeader} items={headers}>
        <Text>Headers: </Text>
      </HeadersSection>

      <Divider my="md" />
      <QueryComponent query={query} setQuery={handleQueryChange} variables={variables} setVariables={setVariables} />
      <Button onClick={go} mb="md">
        Submit
      </Button>

      <Stack>
        <Title mb={15} order={2}>
          Response:
        </Title>

        <StatusComponent status={status} />

        <ResponseBody response={response} />
      </Stack>

      {documentation && <DocumentationComponent documentation={documentation} />}
    </div>
  );
}
