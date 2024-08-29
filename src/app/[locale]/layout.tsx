import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Header from '@/widgets/Header';
import Footer from '@/widgets/Footer';
import LocaleSwitcher from '@/features/localeSwitcher';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
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
            <header>
              <Header>
                <LocaleSwitcher />
              </Header>
            </header>
            <main>{children}</main>
            <footer>
              <Footer />
            </footer>
          </MantineProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
