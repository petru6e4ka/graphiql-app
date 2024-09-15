'use client';

import { TextInput, Button, Box } from '@/shared/ui';
import { useTranslations } from 'next-intl';

interface Props {
  url: string;
  setUrl: (url: string) => void;
  docUrl: string;
  setDocUrl: (docUrl: string) => void;
  fetchDocumentation: () => void;
}

export function EndpointUrl({
  url, setUrl, docUrl, setDocUrl, fetchDocumentation,
}: Props) {
  const t = useTranslations('GraphiQL');

  return (
    <Box mb="md">
      <TextInput label={t('url')} type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Enter GraphQL endpoint URL" />
      <TextInput label={t('sdl')} type="text" value={docUrl} onChange={(e) => setDocUrl(e.target.value)} placeholder="Enter SDL endpoint URL" />
      <Button onClick={fetchDocumentation} mt="sm">
        {t('fetchDoc')}
      </Button>
    </Box>
  );
}
