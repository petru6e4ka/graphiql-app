import { useState } from 'react';
import styles from './TwoInputs.module.css';
import { TextInput } from '../index';

export function TwoInputs() {
  const [state, setState] = useState({ Key: '', Value: '' });

  const handleInputChange = (name: string) => (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    setState({ ...state, [name]: target.value });
  };

  return (
    <div className={styles.container}>
      <TextInput onChange={handleInputChange('Key')} value={state.Key} name="Key" className={styles.textinput} placeholder="Key" />
      <TextInput onChange={handleInputChange('Value')} value={state.Value} name="Value" className={styles.textinput} placeholder="Value" />
    </div>
  );
}
