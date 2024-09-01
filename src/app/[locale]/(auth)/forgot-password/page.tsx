'use client';

import {
  Logo, Button, Title, Space, TextInput,
} from '@/shared/ui';
import { useForm, isEmail } from '@mantine/form';
import { stylesForFieldWithError } from '@/shared/lib/forms/stylesForFieldWithError';
import styles from './ForgotPassword.module.css';

// { params: { locale } }: { params: { locale: string } }

export default function ForgotPassword() {
  const form = useForm({
    mode: 'controlled',
    initialValues: {
      email: '',
    },
    validate: {
      email: isEmail('Invalid email'),
    },
    validateInputOnBlur: true,
  });

  const resetPassword = (data: typeof form.values | null) => {
    console.log(data);
  };

  return (
    <div className={styles.ForgotPassword}>
      <Logo />

      <Title>
        Forgot
        <Space />
        password?
      </Title>

      <Space h="xl" />

      <div className={styles.FormContainer}>
        <form onSubmit={form.onSubmit(resetPassword)} className={styles.Form}>
          <TextInput
            withAsterisk
            label="Email"
            placeholder="your@email.com"
            required
            {...form.getInputProps('email')}
            styles={stylesForFieldWithError}
          />

          <Button type="submit" size="md">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
