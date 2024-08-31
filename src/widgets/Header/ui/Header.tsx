'use client';

import { ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useDisclosure } from '@mantine/hooks';
import cn from 'classnames';
import {
  Logo, Group, Burger, Drawer, ScrollArea, Divider, rem,
} from '@/shared/ui';
import { usePathname } from 'next/navigation';
import { Session } from 'next-auth';
import styles from './Header.module.css';

export function Header({ children, session, locale }: { children: ReactNode; session: Session | null; locale: string }) {
  const [scrollY, setScrollY] = useState(0);
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const t = useTranslations('Header');
  const pathname = usePathname();

  function onChangeY() {
    const scrollValue = window.scrollY;
    setScrollY(scrollValue);
  }

  useEffect(() => {
    window.addEventListener('scroll', onChangeY);
    return () => window.removeEventListener('scroll', onChangeY);
  }, []);

  return (
    <>
      <div className={cn(styles.Header, { [styles.Issticky]: scrollY > 0 })}>
        <Group justify="space-between" h="100%" w="100%">
          <Link href={`/${locale}`}>
            <Logo />
          </Link>

          {session?.user && (
            <Group h="100%" gap={0} visibleFrom="md" className={styles.Nav}>
              <Link href={`/${locale}`} className={cn(styles.Link, { [styles.Active]: pathname?.endsWith(`/${locale}`) })}>
                {t('home')}
              </Link>
              <Link href={`/${locale}/history`} className={cn(styles.Link, { [styles.Active]: pathname?.startsWith(`/${locale}/history`) })}>
                {t('history')}
              </Link>
              <Link href={`/${locale}/rest`} className={cn(styles.Link, { [styles.Active]: pathname?.startsWith(`/${locale}/rest`) })}>
                REST
              </Link>
              <Link href={`/${locale}/graphiql`} className={cn(styles.Link, { [styles.Active]: pathname?.startsWith(`/${locale}/graphiql`) })}>
                GraphiQL
              </Link>
            </Group>
          )}

          <Group visibleFrom="md">{children}</Group>

          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="md" />
        </Group>
      </div>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title={(
          <Link href={`/${locale}`}>
            <Logo />
          </Link>
        )}
        hiddenFrom="md"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(100)})`} mx="-md">
          <Divider my="sm" />

          {session?.user && (
            <>
              <Link href={`/${locale}`} className={cn(styles.Link, { [styles.Active]: pathname?.endsWith(`/${locale}`) })}>
                {t('home')}
              </Link>
              <Link href={`/${locale}/history`} className={cn(styles.Link, { [styles.Active]: pathname.startsWith(`/${locale}/history`) })}>
                {t('history')}
              </Link>
              <Link href={`/${locale}/rest`} className={cn(styles.Link, { [styles.Active]: pathname.startsWith(`/${locale}/rest`) })}>
                Rest
              </Link>
              <Link href={`/${locale}/graphiql`} className={cn(styles.Link, { [styles.Active]: pathname.startsWith(`/${locale}/graphiql`) })}>
                GraphiQL
              </Link>

              <Divider my="sm" />
            </>
          )}

          <Group justify="center" grow pb="xl" px="md">
            {children}
          </Group>
        </ScrollArea>
      </Drawer>
    </>
  );
}
