'use client';

import { useState } from 'react';
import { TextInput } from '@mantine/core';
import { useHeaders } from '@/features/store/headersStore';
import styles from './TwoInputs.module.css';

interface PropsTwoInputs {
  id: string;
}

export function TwoInputs({ id }: PropsTwoInputs) {
  const [state, setState] = useState({ id, Key: '', Value: '' });
  const { updateHeaderInStore } = useHeaders();

  const handleInputChange = (name: string) => (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    setState({ ...state, [name]: target.value });
  };

  return (
    <div className={styles.container}>
      <TextInput
        onChange={handleInputChange('Key')}
        onBlur={() => updateHeaderInStore(state)}
        value={state.Key}
        name="Key"
        className={styles.textinput}
        placeholder="Key"
      />
      <TextInput
        onChange={handleInputChange('Value')}
        onBlur={() => updateHeaderInStore(state)}
        value={state.Value}
        name="Value"
        className={styles.textinput}
        placeholder="Value"
      />
    </div>
  );
}
