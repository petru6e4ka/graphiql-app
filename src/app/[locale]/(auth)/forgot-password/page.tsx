'use client';

import {
  Logo, Button, Title, Space, TextInput,
} from '@/shared/ui';
import { useForm, isEmail } from '@mantine/form';
import { useTranslations } from 'next-intl';
import { stylesForFieldWithError } from '@/shared/lib/forms/stylesForFieldWithError';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/app/firebase';
import styles from './ForgotPassword.module.css';

export default function ForgotPassword() {
  const t = useTranslations('Forms');

  const form = useForm({
    mode: 'controlled',
    initialValues: {
      email: '',
    },
    validate: {
      email: isEmail(t('invalid_email')),
    },
    validateInputOnBlur: true,
  });

  const resetPassword = (data: typeof form.values | null) => {
    if (data) {
      sendPasswordResetEmail(auth, data.email);
    }
  };

  return (
    <div className={styles.ForgotPassword}>
      <Logo />

      <Title>{t('forgot_password')}</Title>

      <Space h="xl" />

      <div className={styles.FormContainer}>
        <form onSubmit={form.onSubmit(resetPassword)} className={styles.Form}>
          <TextInput
            withAsterisk
            label={t('email')}
            placeholder={t('your-email')}
            required
            {...form.getInputProps('email')}
            styles={stylesForFieldWithError}
            aria-label={t('email')}
          />

          <Button type="submit" size="md">
            {t('submit-reset')}
          </Button>
        </form>
      </div>
    </div>
  );
}
