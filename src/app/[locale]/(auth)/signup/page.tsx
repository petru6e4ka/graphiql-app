'use client';

import { useTranslations } from 'next-intl';
import {
  Logo, PasswordInput, TextInput, Button, PasswordWithRequirements, EmailInput, Title, Space,
} from '@/shared/ui';
import styles from './SignUp.module.css';

export default function SignUp() {
  const t = useTranslations('SignUp');
  // Client-side validation should be implemented
  // (email and
  // password strength - minimum 8 symbols,
  // at least one letter,
  // one digit,
  // one special character,
  // Unicode passwords must be supported)

  return (
    <div className={styles.SignUp}>
      <Logo />

      <Title>{t('title')}</Title>

      <Space h="xl" />

      <div className={styles.FormContainer}>
        <form
          action="#"
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className={styles.Form}
        >
          <TextInput label="Name" placeholder="Name" />

          <EmailInput />

          <PasswordWithRequirements />

          <PasswordInput placeholder="Repeat password" label="Repeat password" required />

          <Button type="submit" size="md">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
