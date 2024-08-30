'use client';

import { useState } from 'react';
import Image from 'next/image';
import { TwoInputs } from '@/shared/ui/TwoInputs/TwoInputs';
import IconPlus from '@/shared/assets/icons/plus-circle.svg';
import IconClose from '@/shared/assets/icons/x-circle.svg';
import styles from './HeadersSection.module.css';

export function HeadersSection() {
  const [countHeaders, setCountHeaders] = useState(0);
  const arrHeaders = [...Array(countHeaders).keys()].map((i) => i + 1);

  function onChangeCountHeaders(value: string) {
    switch (value) {
      case '+':
        setCountHeaders(countHeaders + 1);
        break;
      case '-':
        if (countHeaders > 0) {
          setCountHeaders(countHeaders - 1);
        }
        break;
      default:
        break;
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.titles}>
        <h3 className={styles.h3}>Headers</h3>
        <Image onClick={() => onChangeCountHeaders('+')} className={styles.IconPlus} src={IconPlus} alt="Plus" width={25} height={25} />
      </div>
      {arrHeaders.length > 0 && (
        <div className={styles.spanwrap}>
          <span className={styles.span}>Key</span>
          <span className={styles.span}>Value</span>
        </div>
      )}
      {arrHeaders.map((elem) => (
        <div key={elem} className={styles.inputswrap}>
          <TwoInputs />
          <Image onClick={() => onChangeCountHeaders('-')} className={styles.IconClose} src={IconClose} alt="Close" width={25} height={25} />
        </div>
      ))}
    </div>
  );
}
