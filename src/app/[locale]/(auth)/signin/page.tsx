'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import {
  Anchor, Button, Group, Logo, PasswordInput, Text, TextInput, Title,
} from '@/shared/ui';
import { signIn } from 'next-auth/react';
import { isEmail, useForm } from '@mantine/form';
import { passwordStrengthCheck } from '@/shared/lib/forms/passwordStrengthCheck';
import { stylesForFieldWithError } from '@/shared/lib/forms/stylesForFieldWithError';
import { useRouter } from 'next/navigation';
import styles from './SignIn.module.css';

export default function SignIn({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations('Forms');
  const router = useRouter();

  const form = useForm({
    mode: 'controlled',
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: isEmail(t('invalid_email')),
      password: passwordStrengthCheck(t('invalid-password')),
    },
    validateInputOnBlur: true,
  });

  const signInUser = (data: typeof form.values | null) => {
    if (data) {
      signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      }).then((response) => {
        if (response?.error) {
          console.log(response?.error);
          return;
        }

        router.push(`/${locale}`);
      });
    }
  };

  const signInWithGoogle = () => {
    signIn('google', { redirect: false }).then((response) => {
      if (response?.error) {
        console.log(response?.error);
        return;
      }

      router.push(`/${locale}`);
    });
  };

  return (
    <div className={styles.signIn}>
      <Logo />

      <Title className={styles.title}>{t('signin')}</Title>

      <div className={styles.formContainer}>
        <form onSubmit={form.onSubmit(signInUser)} className={styles.form}>
          <TextInput
            withAsterisk
            label={t('email')}
            placeholder={t('your-email')}
            required
            {...form.getInputProps('email')}
            styles={stylesForFieldWithError}
          />

          <div>
            <Group justify="space-between" mb={5}>
              <Text component="label" htmlFor="your-password" size="sm" fw={500}>
                {t('password')}
                <span className={styles.asterisk}>*</span>
              </Text>

              <Anchor component={Link} href={`/${locale}/forgot-password`} pt={2} fw={500} fz="xs">
                {t('forgot-question')}
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

          <Button variant="outline" size="md" onClick={signInWithGoogle} type="button">
            {t('sign-in-with-google')}
          </Button>

          <Group justify="center" mb={5}>
            <Text size="sm" fw={500}>
              {t('not-member-question')}
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
