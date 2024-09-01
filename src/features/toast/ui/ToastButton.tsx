'use client';

import React from 'react';
import { toast } from 'react-toastify';
import { useTranslations } from 'next-intl';

interface Props {
  name: string;
}

export default function ToastButton({ name }: Props) {
  const t = useTranslations(name);
  const t2 = useTranslations('ErrorNotify');

  const showToast = () => {
    toast.success(`${t('success')}`);
  };

  const handleUnauthorizedError = () => {
    toast.error(`${t2('401')}`);
  };

  const handleGatewayTimeoutError = () => {
    toast.error(`${t2('504')}`);
  };

  return (
    <>
      <button onClick={showToast} type="button">
        {t('input-submit')}
      </button>
      <button onClick={handleUnauthorizedError} type="button">
        Cause 401 error
      </button>
      <button onClick={handleGatewayTimeoutError} type="button">
        Cause 503 error
      </button>
    </>
  );
}
