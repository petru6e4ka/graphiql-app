'use client';

import { ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import Logo from '@/shared/ui/Logo';
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
    <div className={`${styles.Header} ${scrollY > 0 && 'issticky'}`}>
      <Link href="/">
        <Logo />
      </Link>
      <div>
        {children}
      </div>
    </div>
  );
}

export default Header;
