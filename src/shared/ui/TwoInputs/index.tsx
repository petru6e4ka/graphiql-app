'use client';

import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import { TextInput } from '@mantine/core';
import styles from './TwoInputs.module.css';

export interface Item {
  id: string;
  name: string;
  value: string;
}

interface Props extends Item {
  update: (item: Item) => void;
}

export function TwoInputs({
  id, name, value, update,
}: Props) {
  const t = useTranslations('REST');

  const currentInputs = useMemo(
    () => ({
      id,
      name,
      value,
    }),
    [id, name, value],
  );

  const [state, setState] = useState<Item>(currentInputs);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const upDateStorage = () => {
    update(state);
  };

  return (
    <div className={styles.container}>
      <TextInput
        onChange={handleInputChange}
        onBlur={upDateStorage}
        value={state.name || ''}
        name="name"
        className={styles.textinput}
        placeholder={t('header-key')}
      />
      <TextInput
        onChange={handleInputChange}
        onBlur={upDateStorage}
        value={state.value || ''}
        name="value"
        className={styles.textinput}
        placeholder={t('header-value')}
      />
    </div>
  );
}
