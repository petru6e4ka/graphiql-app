'use client';

import { ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import Logo from '@/shared/ui/Logo';
import cn from 'classnames';
import styles from './Header.module.css';

export function Header({ children }: { children: ReactNode }) {
  const [scrollY, setScrollY] = useState(0);

  function onChangeY() {
    const scrollValue = window.scrollY;
    setScrollY(scrollValue);
  }

  useEffect(() => {
    window.addEventListener('scroll', onChangeY);
    return () => window.removeEventListener('scroll', onChangeY);
  }, []);

  return (
    <nav className={cn(styles.Header, { issticky: scrollY > 0 })}>
      <Link href="/">
        <Logo />
      </Link>
      <div className={styles.childs}>{children}</div>
    </nav>
  );
}

export default Header;
