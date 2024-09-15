'use client';

import { Group, PasswordInput, Text, Box, Center, Progress } from '@mantine/core';
import { useTranslations } from 'next-intl';

export function PasswordRequirement({ meets, label }: { meets: boolean; label: string }) {
  return (
    <Text component="div" c={meets ? 'teal' : 'gray'} mt={5} size="sm">
      <Center inline>
        <Box ml={7}>{label}</Box>
      </Center>
    </Text>
  );
}

const getColor = (strength: number) => {
  if (strength > 80) {
    return 'teal';
  }

  if (strength > 50) {
    return 'yellow';
  }

  return 'red';
};

type Props = {
  onChange: () => void;
  value?: string;
  defaultValue?: string;
  checked?: boolean;
  error?: string;
  styles: object;
  onFocus?: () => void;
  onBlur?: () => void;
};

export function PasswordWithRequirements({ onChange, value, defaultValue, checked, error, styles, onFocus, onBlur }: Props) {
  const t = useTranslations('Forms');

  const requirements = [
    { re: /[0-9]/, label: t('has-number') },
    { re: /[A-Za-z\u0400-\u04FF]/, label: t('has-letter') },
    { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: t('has-special-char') },
  ];

  function getStrength(password: string) {
    let multiplier = password.length > 7 ? 0 : 1;

    requirements.forEach((requirement) => {
      if (!requirement.re.test(password)) {
        multiplier += 1;
      }
    });

    return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 0);
  }

  const password = value || '';
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
        onChange={onChange}
        placeholder={t('password')}
        label={t('password')}
        required
        defaultValue={defaultValue}
        checked={checked}
        error={error}
        onFocus={onFocus}
        onBlur={onBlur}
        styles={styles}
      />

      <Group gap={5} grow mt="xs" mb="md">
        {bars}
      </Group>

      <PasswordRequirement label={t('has-length')} meets={password.length > 7} />
      {checks}
    </div>
  );
}
