import {getRequestConfig} from 'next-intl/server';
import {notFound} from 'next/navigation';
export const locales = ['en', 'ru'];

export default getRequestConfig(async ({locale}) => {
  if (!locales.includes(locale as string)) notFound();

  return {
    messages: (await import(`/src/translations/${locale}.json`)).default
  };
});
