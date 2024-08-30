import React from 'react';
import styles from './TwoInputs.module.css';
import { TextInput } from '../index';

export function TwoInputs() {
  return (
    <div className={styles.container}>
      <TextInput className={styles.textinput} placeholder="Key" />
      <TextInput className={styles.textinput} placeholder="Value" />
    </div>
  );
}
