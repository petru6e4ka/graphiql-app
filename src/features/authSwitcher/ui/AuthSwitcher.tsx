'use client';

import { signOut, useSession } from 'next-auth/react';
import { Button, Group } from '@/shared/ui';
import { useRouter } from '@/features/localeSwitcher';
import { useTranslations } from 'next-intl';

export function AuthSwitcher() {
  const router = useRouter();
  const t = useTranslations('Header');
  const { data: session } = useSession();

  const onSignOut = () => {
    signOut({ redirect: false }).then(() => {
      router.push('/');
    });
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
          router.push('/signup');
        }}
      >
        {t('sign-up')}
      </Button>
      <Button
        size="md"
        onClick={() => {
          router.push('/signin');
        }}
      >
        {t('sign-in')}
      </Button>
    </Group>
  );
}

export default AuthSwitcher;
