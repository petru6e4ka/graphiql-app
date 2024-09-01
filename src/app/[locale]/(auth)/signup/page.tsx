'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/app/firebase';
import {
  Logo, TextInput, Button, PasswordWithRequirements, Title, Space,
} from '@/shared/ui';
import { isEmail, useForm } from '@mantine/form';
import { passwordStrengthCheck } from '@/shared/lib/forms/passwordStrengthCheck';
import { hideErrorMessage, stylesForFieldWithError } from '@/shared/lib/forms/stylesForFieldWithError';
import styles from './SignUp.module.css';

export default function SignUp({ params: { locale } }: { params: { locale: string } }) {
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

  const registerNewUser = (data: typeof form.values | null) => {
    if (data) {
      createUserWithEmailAndPassword(auth, data.email, data.password)
        .then(() => {
          router.push(`/${locale}/signin`);
        })
        .catch(console.log);
    }
  };

  return (
    <div className={styles.SignUp}>
      <Logo />

      <Title>{t('signup')}</Title>

      <Space h="xl" />

      <div className={styles.FormContainer}>
        <form onSubmit={form.onSubmit(registerNewUser)} className={styles.Form}>
          <TextInput
            withAsterisk
            label={t('email')}
            placeholder={t('your-email')}
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
