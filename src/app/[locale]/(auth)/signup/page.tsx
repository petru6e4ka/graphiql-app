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
  const t = useTranslations('SignUp');

  const form = useForm({
    mode: 'controlled',
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validate: {
      email: isEmail('Invalid email'),
      password: passwordStrengthCheck,
    },
    validateInputOnBlur: true,
  });

  const registerNewUser = (data: typeof form.values | null) => {
    console.log(data);
  };

  return (
    <div className={styles.SignUp}>
      <Logo />

      <Title>{t('title')}</Title>

      <Space h="xl" />

      <div className={styles.FormContainer}>
        <form onSubmit={form.onSubmit(registerNewUser)} className={styles.Form}>
          <TextInput label="Name" placeholder="Name" {...form.getInputProps('name')} />

          <TextInput
            withAsterisk
            label="Email"
            placeholder="your@email.com"
            required
            {...form.getInputProps('email')}
            styles={stylesForFieldWithError}
          />

          <PasswordWithRequirements {...form.getInputProps('password')} {...form.getInputProps('password')} styles={hideErrorMessage} />

          <Button type="submit" size="md">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
