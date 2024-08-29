import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Header from '@/widgets/Header';
import Footer from '@/widgets/Footer';
import LocaleSwitcher from '@/features/localeSwitcher';
import { AuthSwitcher, SessionWrapper } from '@/features/authSwitcher';
import './globals.css';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

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

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionWrapper>
          <NextIntlClientProvider messages={messages}>
            <header>
              <Header>
                <LocaleSwitcher />
                <AuthSwitcher locale={locale} />
              </Header>
            </header>
            <main>{children}</main>
            <footer>
              <Footer />
            </footer>
          </NextIntlClientProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
