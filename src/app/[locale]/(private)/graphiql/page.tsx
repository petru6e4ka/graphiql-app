/* eslint-disable object-curly-newline */
/* eslint-disable implicit-arrow-linebreak */

'use client';

import { useEffect, useState } from 'react';
import parserGraphql from 'prettier/parser-graphql';
import prettier from 'prettier/standalone';
import { useTranslations } from 'next-intl';
import { Title, Button, Divider, Stack, Text } from '@/shared/ui';
import HeadersSection from '@/widgets/HeadersSection';
import EndpointUrl from '@/widgets/EndpointUrl';
import QueryComponent from '@/widgets/QueryComponent';
import StatusComponent from '@/widgets/StatusComponent';
import ResponseBody from '@/widgets/ResponseBody';
import DocumentationComponent from '@/widgets/DocumentationComponent';
import { useGraphHeaders, type Header } from '@/features/store/graphHeaders';
import { useHistoryStore } from '@/features/store/historyStore';
import { useGraphRequest } from '@/features/store/graphRequest';
import styles from './graphql.module.css';

const base64Encode = (str: string) => btoa(unescape(encodeURIComponent(str)));

export default function GraphiQLClient() {
  const t = useTranslations('GraphiQL');

  const { queryGraphQL, variablesGraphQL } = useGraphRequest();

  const [url, setUrl] = useState('https://swapi-graphql.netlify.app/.netlify/functions/index');
  const [docUrl, setDocUrl] = useState('');
  const [query, setQuery] = useState(queryGraphQL);
  const [variables, setVariables] = useState(variablesGraphQL);
  const [response, setResponse] = useState('');
  const [status, setStatus] = useState('');
  const [documentation, setDocumentation] = useState('');
  const { headers, addHeaderInStoreGQL, removeHeaderFromStore, updateHeaderInStore, cleanHeadersGQL } = useGraphHeaders();
  const { addRequest } = useHistoryStore();

  const addNewHeader = (item: object) => {
    addHeaderInStoreGQL(item as Header);
  };

  const updateHeader = (item: object) => {
    updateHeaderInStore(item as Header);
  };

  useEffect(() => {
    if (!docUrl || docUrl === url) {
      setDocUrl(`${url}?sdl`);
    }
  }, [url]);

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

  const headersToQueryParams = (allHeaders: Record<string, string>) =>
    Object.entries(allHeaders)
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
      }).then(
        (res) =>
          res.json().then((data) => ({
            data,
            status: res.status,
          })),
        // eslint-disable-next-line function-paren-newline
      );
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

    addRequest({
      date: new Date().toUTCString(),
      url,
      method: 'GRAPHQL',
      headers: headersObject,
      queryGraphQL: query,
      variablesGraphQL: variables,
    });
  };

  const clearAll = () => {
    setQuery('');
    setVariables('');
    setUrl('');
    cleanHeadersGQL();
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
      <div className={styles.buttons}>
        <Button onClick={go} mb="md">
          Submit
        </Button>
        <Button onClick={clearAll} mb="md">
          Clear All
        </Button>
      </div>

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
