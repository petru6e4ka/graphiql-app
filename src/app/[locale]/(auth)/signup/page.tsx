'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from '@/features/localeSwitcher';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/app/firebase';
import { Logo, TextInput, Button, PasswordWithRequirements, Title } from '@/shared/ui';
import { isEmail, useForm } from '@mantine/form';
import { passwordStrengthCheck } from '@/shared/lib/forms/passwordStrengthCheck';
import { hideErrorMessage, stylesForFieldWithError } from '@/shared/lib/forms/stylesForFieldWithError';
import { showToast, ToastType } from '@/features/toast';
import styles from './SignUp.module.css';

export default function SignUp() {
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
          router.push('/signin');
        })
        .catch(() => {
          showToast(`${t('error-signup')}`, ToastType.error);
        });
    }
  };

  return (
    <div className={styles.signUp}>
      <Logo />

      <Title className={styles.title}>{t('signup')}</Title>

      <div className={styles.formContainer}>
        <form onSubmit={form.onSubmit(registerNewUser)} className={styles.form}>
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
