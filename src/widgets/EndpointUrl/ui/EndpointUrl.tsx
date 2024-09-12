'use client';

import { TextInput, Button, Box } from '@mantine/core';

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
  return (
    <Box mb="md">
      <TextInput
        label="Endpoint URL"
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter GraphQL endpoint URL"
      />
      <TextInput
        label="SDL URL"
        type="text"
        value={docUrl}
        onChange={(e) => setDocUrl(e.target.value)}
        placeholder="Enter SDL endpoint URL"
      />
      <Button onClick={fetchDocumentation} mt="sm">Fetch Documentation</Button>
    </Box>
  );
}
