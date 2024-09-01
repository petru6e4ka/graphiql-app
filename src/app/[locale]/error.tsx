'use client';

import { useTranslations } from 'next-intl';

export default function ErrorBoundary({ error, reset }: { error: Error; reset: () => void }) {
  const t = useTranslations('Error.Boundary');

  return (
    <>
      <h1>{t('title')}</h1>
      <p>{error.message}</p>
      <button type="button" onClick={reset}>
        {t('back')}
      </button>
    </>
  );
}
