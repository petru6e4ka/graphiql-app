import { useTranslations } from 'next-intl';
import { Title, Stack } from '@/shared/ui';
import RestForm from '@/features/restForm';
import ResponseBody from '@/widgets/ResponseBody';
import StatusComponent from '@/widgets/StatusComponent';
import styles from './Rest.module.css';

export default function Rest() {
  const t = useTranslations('REST');

  return (
    <div className={styles.rest}>
      <Title className={styles.header}>{t('title')}</Title>

      <div className={styles.content}>
        <Title className={styles.subtitle} order={2}>
          {t('request-data')}
        </Title>

        <div className={styles.form}>
          <RestForm />
        </div>

        <Stack>
          <Title className={styles.subtitle} order={2}>
            {t('response')}
          </Title>

          <StatusComponent status="123" />

          <ResponseBody response="123" />
        </Stack>
      </div>
    </div>
  );
}
