'use client';

import { ReactNode, useEffect, useState } from 'react';
import { Link, usePathname } from '@/features/localeSwitcher';
import { useTranslations } from 'next-intl';
import { useDisclosure } from '@mantine/hooks';
import cn from 'classnames';
import { Logo, Group, Burger, Drawer, ScrollArea, Divider, rem } from '@/shared/ui';
import { useSession } from 'next-auth/react';
import styles from './Header.module.css';

export function Header({ children }: { children: ReactNode }) {
  const [scrollY, setScrollY] = useState(0);
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
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
          <Link href="/">
            <Logo />
          </Link>

          {session?.user && (
            <Group h="100%" gap={0} visibleFrom="md" className={styles.nav}>
              <Link href="/" className={cn(styles.link, { [styles.active]: pathname?.endsWith('/') })}>
                {t('home')}
              </Link>
              <Link href="/history" className={cn(styles.link, { [styles.active]: pathname?.endsWith('/history') })}>
                {t('history')}
              </Link>
              <Link href="/rest" className={cn(styles.link, { [styles.active]: pathname?.endsWith('/rest') })}>
                REST
              </Link>
              <Link href="/graphiql" className={cn(styles.link, { [styles.active]: pathname?.endsWith('/graphiql') })}>
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
        title={
          <Link href="/">
            <Logo />
          </Link>
        }
        hiddenFrom="md"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(100)})`} mx="-md">
          <Divider my="sm" />

          {session?.user && (
            <>
              <Link href="/" className={cn(styles.link, { [styles.active]: pathname?.endsWith('/') })}>
                {t('home')}
              </Link>
              <Link href="/history" className={cn(styles.link, { [styles.active]: pathname.endsWith('/history') })}>
                {t('history')}
              </Link>
              <Link href="/rest" className={cn(styles.link, { [styles.active]: pathname.endsWith('/rest') })}>
                Rest
              </Link>
              <Link href="/graphiql" className={cn(styles.link, { [styles.active]: pathname.endsWith('/graphiql') })}>
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
