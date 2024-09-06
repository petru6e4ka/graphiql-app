import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ToastProvider } from '@/features/toast';
import Header from '@/widgets/Header';
import Footer from '@/widgets/Footer';
import LocaleSwitcher from '@/features/localeSwitcher';
import { AuthSwitcher, SessionWrapper } from '@/features/authSwitcher';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'REST GraphQL Client',
  description: 'REST GraphQL Client',
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <SessionWrapper>
          <MantineProvider>
            <NextIntlClientProvider messages={messages}>
              <ToastProvider>
                <header>
                  <Header>
                    <LocaleSwitcher />
                    <AuthSwitcher />
                  </Header>
                </header>
                <main>{children}</main>
                <footer>
                  <Footer />
                </footer>
              </ToastProvider>
            </NextIntlClientProvider>
          </MantineProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
