'use client';
import React from 'react';
import style from './header.module.css';
import { ApiOutlined } from '@ant-design/icons';
import Link from 'next/link';
import SwitchLang from '../switchLang/switchLang';
import { Button } from 'antd';

function Header() {
  const [Y, setY] = React.useState(0);

  function onChangeY() {
    const scrollValue = window.scrollY;
    setY(scrollValue);
  }
  React.useEffect(() => {
    window.addEventListener('scroll', onChangeY);
    return () => window.removeEventListener('scroll', onChangeY);
  }, []);
  return (
    <header className={`${style.header} ${Y > 0 && 'issticky'}`}>
      <ApiOutlined style={{ fontSize: '150%' }} />
      <Link href="/">Home</Link>
      <SwitchLang />
      <Button>Sign Out </Button>
    </header>
  );
}

export default Header;
