'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import {
  Anchor, Button, Group, Logo, PasswordInput, Space, Text, TextInput, Title,
} from '@/shared/ui';
import { signIn } from 'next-auth/react';
import { isEmail, useForm } from '@mantine/form';
import { passwordStrengthCheck } from '@/shared/lib/forms/passwordStrengthCheck';
import { stylesForFieldWithError } from '@/shared/lib/forms/stylesForFieldWithError';
import styles from './SignIn.module.css';

export default function SignIn({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations('SignIn');

  const form = useForm({
    mode: 'controlled',
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: isEmail('Invalid email'),
      password: passwordStrengthCheck,
    },
    validateInputOnBlur: true,
  });

  const signInUser = (data: typeof form.values | null) => {
    console.log(data);
  };

  return (
    <div className={styles.SignIn}>
      <Logo />

      <Title>{t('title')}</Title>

      <Space h="xl" />

      <div className={styles.FormContainer}>
        <form onSubmit={form.onSubmit(signInUser)} className={styles.Form}>
          <TextInput
            withAsterisk
            label="Email"
            placeholder="your@email.com"
            required
            {...form.getInputProps('email')}
            styles={stylesForFieldWithError}
          />

          <div>
            <Group justify="space-between" mb={5}>
              <Text component="label" htmlFor="your-password" size="sm" fw={500}>
                Your password
                <span className={styles.Asterisk}>*</span>
              </Text>

              <Anchor component={Link} href={`/${locale}/forgot-password`} pt={2} fw={500} fz="xs">
                Forgot your password?
              </Anchor>
            </Group>
            <PasswordInput
              placeholder="Your password"
              id="your-password"
              required
              {...form.getInputProps('password')}
              styles={stylesForFieldWithError}
            />
          </div>

          <Button type="submit" size="md">
            Submit
          </Button>

          <Button variant="outline" size="md" onClick={() => signIn('google', { callbackUrl: `/${locale}`, redirect: true })} type="button">
            Login with Google
          </Button>

          <Group justify="center" mb={5}>
            <Text size="sm" fw={500}>
              Not a member?
            </Text>

            <Anchor component={Link} href={`/${locale}/signup`} pt={2} fw={500} fz="xs">
              Sign up
            </Anchor>
          </Group>
        </form>
      </div>
    </div>
  );
}
