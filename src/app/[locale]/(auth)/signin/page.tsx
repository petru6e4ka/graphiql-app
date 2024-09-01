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
  const t = useTranslations('Forms');

  const form = useForm({
    mode: 'controlled',
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: isEmail(t('invalid_email')),
      password: passwordStrengthCheck(t('invalid_password')),
    },
    validateInputOnBlur: true,
  });

  const signInUser = (data: typeof form.values | null) => {
    if (data) {
      signIn('credentials', {
        email: data.email, password: data.password, redirect: true, callbackUrl: '/',
      });
    }
  };

  return (
    <div className={styles.SignIn}>
      <Logo />

      <Title>{t('signin')}</Title>

      <Space h="xl" />

      <div className={styles.FormContainer}>
        <form onSubmit={form.onSubmit(signInUser)} className={styles.Form}>
          <TextInput
            withAsterisk
            label={t('email')}
            placeholder={t('your_email')}
            required
            {...form.getInputProps('email')}
            styles={stylesForFieldWithError}
          />

          <div>
            <Group justify="space-between" mb={5}>
              <Text component="label" htmlFor="your-password" size="sm" fw={500}>
                {t('password')}
                <span className={styles.Asterisk}>*</span>
              </Text>

              <Anchor component={Link} href={`/${locale}/forgot-password`} pt={2} fw={500} fz="xs">
                {t('forgot_question')}
              </Anchor>
            </Group>
            <PasswordInput
              placeholder={t('password')}
              id="your-password"
              required
              {...form.getInputProps('password')}
              styles={stylesForFieldWithError}
            />
          </div>

          <Button type="submit" size="md">
            {t('signin')}
          </Button>

          <Button variant="outline" size="md" onClick={() => signIn('google', { callbackUrl: `/${locale}`, redirect: true })} type="button">
            {t('sign_in_with_google')}
          </Button>

          <Group justify="center" mb={5}>
            <Text size="sm" fw={500}>
              {t('not_member_question')}
            </Text>

            <Anchor component={Link} href={`/${locale}/signup`} pt={2} fw={500} fz="xs">
              {t('signup')}
            </Anchor>
          </Group>
        </form>
      </div>
    </div>
  );
}
