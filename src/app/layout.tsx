import type { Metadata } from 'next';
import Image from 'next/image';
import React from 'react';
import { Layout } from 'antd';
import { Footer, Content } from 'antd/lib/layout/layout';
import { GithubOutlined } from '@ant-design/icons';
import Link from 'next/link';
import './globals.css';
import RS from '../../public/rss-logo.svg';
import style from './layout.module.css';
import Header from '../components/header/header';

export const metadata: Metadata = {
  title: 'Rest GraphQL Client',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Layout className={style.layout}>
          <Header />
          <Content className={style.content}>{children}</Content>
          <Footer className={style.footer}>
            <Link href="https://rs.school/">
              <Image src={RS} alt="RSSchool" width={20} height={20} />
            </Link>
            <span>2024</span>
            <div className={style.github}>
              <Link href="https://github.com/zytsev">
                <GithubOutlined />
                Evgeny
              </Link>
              <Link href="https://github.com/petru6e4ka">
                <GithubOutlined />
                Anastasiia
              </Link>
              <Link href="https://github.com/mindvan">
                <GithubOutlined />
                Ivan
              </Link>
            </div>
          </Footer>
        </Layout>
      </body>
    </html>
  );
}
