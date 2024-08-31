'use client';

import { useState } from 'react';
import {
  Group, PasswordInput, Text, Box, Center, Progress,
} from '@mantine/core';

export function PasswordRequirement({ meets, label }: { meets: boolean; label: string }) {
  return (
    <Text component="div" c={meets ? 'teal' : 'gray'} mt={5} size="sm">
      <Center inline>
        <Box ml={7}>{label}</Box>
      </Center>
    </Text>
  );
}

const requirements = [
  { re: /[0-9]/, label: 'Includes number' },
  { re: /\p{Letter}/u, label: 'Includes letter' },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol' },
];

const getColor = (strength: number) => {
  if (strength > 80) {
    return 'teal';
  }

  if (strength > 50) {
    return 'yellow';
  }

  return 'red';
};

function getStrength(password: string) {
  let multiplier = password.length > 7 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 0);
}

export function PasswordWithRequirements() {
  const [password, setPassword] = useState('');

  const strength = getStrength(password);
  const checks = requirements.map((requirement) => (
    <PasswordRequirement key={requirement.label} label={requirement.label} meets={requirement.re.test(password)} />
  ));
  const bars = Array(4)
    .fill(0)
    .map((elem, index) => elem + index)
    .map((elem) => {
      const isFull = (password.length > 0 && elem === 0) || strength >= ((elem + 1) / 4) * 100;

      return <Progress styles={{ section: { transitionDuration: '0ms' } }} value={isFull ? 100 : 0} color={getColor(strength)} key={elem} size={4} />;
    });

  return (
    <div>
      <PasswordInput
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        placeholder="Your password"
        label="Password"
        required
      />

      <Group gap={5} grow mt="xs" mb="md">
        {bars}
      </Group>

      <PasswordRequirement label="Has at least 6 characters" meets={password.length > 5} />
      {checks}
    </div>
  );
}
