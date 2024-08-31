import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Header from '@/widgets/Header';
import Footer from '@/widgets/Footer';
import LocaleSwitcher from '@/features/localeSwitcher';
import { AuthSwitcher, SessionWrapper, authOptions } from '@/features/authSwitcher';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { getServerSession } from 'next-auth';
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
  params: {
    locale: string;
  };
}>) {
  const messages = await getMessages();
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <SessionWrapper>
          <MantineProvider>
            <NextIntlClientProvider messages={messages}>
              <header>
                <Header locale={locale} session={session}>
                  <LocaleSwitcher />
                  <AuthSwitcher locale={locale} session={session} />
                </Header>
              </header>
              <main>{children}</main>
              <footer>
                <Footer />
              </footer>
            </NextIntlClientProvider>
          </MantineProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
