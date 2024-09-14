import { Textarea, Box, Title } from '@/shared/ui';

export function DocumentationComponent({ documentation }: { documentation: string }) {
  return (
    documentation && (
      <Box mt="md">
        <Title order={3}>Documentation</Title>
        <Textarea placeholder="SDL Documentation" value={documentation} readOnly minRows={10} />
      </Box>
    )
  );
}
