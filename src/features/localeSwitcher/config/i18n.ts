import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { locales } from './locales';

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as string)) notFound();

  return {
    messages: (await import(`/public/messages/${locale}.json`)).default,
  };
});
