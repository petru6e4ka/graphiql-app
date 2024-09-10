import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Button } from '@/shared/ui';
import style from './notHistory.module.css';

export function NotHistory() {
  const t = useTranslations('History');

  return (
    <div>
      <h3>{t('not-history')}</h3>
      <div className={style.buttons}>
        <Link href="/rest">
          <Button>Rest</Button>
        </Link>
        <Link href="/graphiql">
          <Button>GraphQL</Button>
        </Link>
      </div>
    </div>
  );
}
