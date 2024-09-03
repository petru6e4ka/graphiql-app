'use client';

import { ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { useDisclosure } from '@mantine/hooks';
import cn from 'classnames';
import {
  Logo, Group, Burger, Drawer, ScrollArea, Divider, rem,
} from '@/shared/ui';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import styles from './Header.module.css';

export function Header({ children }: { children: ReactNode }) {
  const [scrollY, setScrollY] = useState(0);
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const locale = useLocale();
  const t = useTranslations('Header');
  const pathname = usePathname();
  const { data: session } = useSession();

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
      <div className={cn(styles.header, { [styles.isSticky]: scrollY > 0 })}>
        <Group justify="space-between" h="100%" w="100%">
          <Link href={`/${locale}`}>
            <Logo />
          </Link>

          {session?.user && (
            <Group h="100%" gap={0} visibleFrom="md" className={styles.nav}>
              <Link href={`/${locale}`} className={cn(styles.link, { [styles.active]: pathname?.endsWith(`/${locale}`) })}>
                {t('home')}
              </Link>
              <Link href={`/${locale}/history`} className={cn(styles.link, { [styles.active]: pathname?.startsWith(`/${locale}/history`) })}>
                {t('history')}
              </Link>
              <Link href={`/${locale}/rest`} className={cn(styles.link, { [styles.active]: pathname?.startsWith(`/${locale}/rest`) })}>
                REST
              </Link>
              <Link href={`/${locale}/graphiql`} className={cn(styles.link, { [styles.active]: pathname?.startsWith(`/${locale}/graphiql`) })}>
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
              <Link href={`/${locale}`} className={cn(styles.link, { [styles.active]: pathname?.endsWith(`/${locale}`) })}>
                {t('home')}
              </Link>
              <Link href={`/${locale}/history`} className={cn(styles.link, { [styles.active]: pathname.startsWith(`/${locale}/history`) })}>
                {t('history')}
              </Link>
              <Link href={`/${locale}/rest`} className={cn(styles.link, { [styles.active]: pathname.startsWith(`/${locale}/rest`) })}>
                Rest
              </Link>
              <Link href={`/${locale}/graphiql`} className={cn(styles.link, { [styles.active]: pathname.startsWith(`/${locale}/graphiql`) })}>
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
