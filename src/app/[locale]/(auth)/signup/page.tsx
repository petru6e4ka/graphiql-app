'use client';

import { useTranslations } from 'next-intl';
import {
  Logo, TextInput, Button, PasswordWithRequirements, Title, Space,
} from '@/shared/ui';
import { isEmail, useForm } from '@mantine/form';
import { passwordStrengthCheck } from '@/shared/lib/forms/passwordStrengthCheck';
import { hideErrorMessage, stylesForFieldWithError } from '@/shared/lib/forms/stylesForFieldWithError';
import styles from './SignUp.module.css';

export default function SignUp() {
  const t = useTranslations('Forms');

  const form = useForm({
    mode: 'controlled',
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validate: {
      email: isEmail('Invalid email'),
      password: passwordStrengthCheck(t('invalid_password')),
    },
    validateInputOnBlur: true,
  });

  const registerNewUser = (data: typeof form.values | null) => {
    console.log(data);
  };

  return (
    <div className={styles.SignUp}>
      <Logo />

      <Title>{t('signup')}</Title>

      <Space h="xl" />

      <div className={styles.FormContainer}>
        <form onSubmit={form.onSubmit(registerNewUser)} className={styles.Form}>
          <TextInput label={t('name')} placeholder={t('name')} {...form.getInputProps('name')} />

          <TextInput
            withAsterisk
            label={t('email')}
            placeholder={t('your_email')}
            required
            {...form.getInputProps('email')}
            styles={stylesForFieldWithError}
          />

          <PasswordWithRequirements {...form.getInputProps('password')} styles={hideErrorMessage} />

          <Button type="submit" size="md">
            {t('signup')}
          </Button>
        </form>
      </div>
    </div>
  );
}
