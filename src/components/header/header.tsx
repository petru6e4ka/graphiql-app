'use client';

import { useEffect, useState } from 'react';
import { ApiOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { Button } from 'antd';
import SwitchLang from '../switchLang/switchLang';
import style from './header.module.css';

function Header() {
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
    <header className={`${style.header} ${scrollY > 0 && 'issticky'}`}>
      <ApiOutlined style={{ fontSize: '150%' }} />
      <Link href="/">Home</Link>
      <SwitchLang />
      <Button>Sign Out </Button>
    </header>
  );
}

export default Header;
