import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Header from '@/widgets/Header';
import Footer from '@/widgets/Footer';
import LocaleSwitcher from '@/features/localeSwitcher';
import { AuthButtons } from '@/shared/ui/AuthButtons/AuthButtons';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import ToastProvider from '../../features/toast/ui/ToastProvider';
import '@mantine/core/styles.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'REST GraphQL Client',
  description: 'REST GraphQL Client',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();

  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <MantineProvider>
            <ToastProvider>
              <header>
                <Header>
                  <LocaleSwitcher />
                  <AuthButtons />
                </Header>
              </header>
              <main>{children}</main>
              <footer>
                <Footer />
              </footer>
            </ToastProvider>
          </MantineProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
