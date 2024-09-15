'use client';

import { Textarea, Box } from '@mantine/core';

interface Props {
  query: string;
  setQuery: (query: string) => void;
  variables: string;
  setVariables: (variables: string) => void;
}

export function QueryComponent({ query, setQuery, variables, setVariables }: Props) {
  return (
    <Box mb="md">
      <Textarea label="Query" placeholder="Enter GraphQL query" value={query} onChange={(e) => setQuery(e.target.value)} rows={6} />
      <Textarea
        label="Variables (JSON)"
        placeholder='Enter variables as JSON (e.g., {"id": "1"})'
        value={variables}
        onChange={(e) => setVariables(e.target.value)}
        rows={4}
      />
    </Box>
  );
}
