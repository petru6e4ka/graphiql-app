import { useTranslations } from 'next-intl';
import { Link } from '@/features/localeSwitcher/config/i18n/routing';

export default function NotFoundPage({ reset }: { reset: () => void }) {
  const t = useTranslations('Error.404');

  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('heading')}</p>
      <Link href="/">
        <button type="button" onClick={reset}>
          {t('back')}
        </button>
      </Link>
    </div>
  );
}
