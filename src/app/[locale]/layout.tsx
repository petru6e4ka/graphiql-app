import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import './globals.css';
import Header from '@/widgets/Header';
import Footer from '@/widgets/Footer';
import LocaleSwitcher from '@/features/localeSwitcher';
import AuthButtons from '@/shared/ui/AuthButtons';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

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
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
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
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
