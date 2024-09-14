'use client';

import { useTranslations } from 'next-intl';
import { Title } from '@/shared/ui';
import HistoryUI, { EmptyHistory } from '@/widgets/History';
import { useHistoryStore } from '@/features/store/historyStore';
import styles from './History.module.css';

export default function History() {
  const t = useTranslations('History');

  const { requests } = useHistoryStore();

  return (
    <div className={styles.content}>
      <Title className={styles.title} mb={25}>
        {t('title')}
      </Title>
      {requests.length > 0 ? <HistoryUI elements={requests} /> : <EmptyHistory />}
    </div>
  );
}
