import { Textarea, Box, Title } from '@mantine/core';

export function DocumentationComponent({ documentation }: { documentation: string }) {
  return (
    documentation && (
      <Box mt="md">
        <Title order={3}>Documentation</Title>
        <Textarea
          placeholder="SDL Documentation"
          value={documentation}
          readOnly
          minRows={10}
        />
      </Box>
    )
  );
}
