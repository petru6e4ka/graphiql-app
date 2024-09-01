'use client';

import { signOut } from 'next-auth/react';
import { Button, Group } from '@/shared/ui';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Session } from 'next-auth';

export function AuthSwitcher({ locale, session }: { locale: string; session: Session | null }) {
  const router = useRouter();
  const t = useTranslations('Header');

  const onSignOut = () => {
    signOut({ redirect: true, callbackUrl: `/${locale}` });
  };

  const isLoggedIn = !!session;

  if (isLoggedIn) {
    return (
      <Button size="md" variant="outline" onClick={onSignOut}>
        {t('log-out')}
      </Button>
    );
  }

  return (
    <Group justify="center">
      <Button
        size="md"
        variant="outline"
        onClick={() => {
          router.push(`/${locale}/signup`);
        }}
      >
        {t('sign-up')}
      </Button>
      <Button
        size="md"
        onClick={() => {
          router.push(`/${locale}/signin`);
        }}
      >
        {t('sign-in')}
      </Button>
    </Group>
  );
}

export default AuthSwitcher;
