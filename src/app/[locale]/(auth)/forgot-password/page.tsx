'use client';

import {
  Logo, EmailInput, Button, Title, Space,
} from '@/shared/ui';
import styles from './ForgotPassword.module.css';

// { params: { locale } }: { params: { locale: string } }

export default function ForgotPassword() {
  return (
    <div className={styles.ForgotPassword}>
      <Logo />

      <Title>Forgot password?</Title>

      <Space h="xl" />

      <div className={styles.FormContainer}>
        <form
          action="#"
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className={styles.Form}
        >
          <EmailInput />

          <Button type="submit" size="md">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
