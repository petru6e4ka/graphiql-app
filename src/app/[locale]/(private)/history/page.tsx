'use client';

import { useTranslations } from 'next-intl';
import { Title } from '@/shared/ui';
import HistoryUI from '@/widgets/HistoryUI';
import NotHistory from '@/widgets/NotHistory';

export default function History() {
  const t = useTranslations('History');

  const ls = window.localStorage.getItem('requests');
  let requests = [];
  if (ls) {
    requests = JSON.parse(ls);
  }

  return (
    <div>
      <Title>{t('title')}</Title>
      {requests.length > 0 ? <HistoryUI elements={requests} /> : <NotHistory />}
    </div>
  );
}
