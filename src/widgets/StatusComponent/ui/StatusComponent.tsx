'use client';

import { TextInput, Group, Text } from '@mantine/core';

export function StatusComponent({ status }: { status: string }) {
  return (
    <Group>
      <Text fw={500}>Status:</Text>
      <TextInput
        placeholder="HTTP Status Code"
        value={status}
        readOnly
      />
    </Group>
  );
}
