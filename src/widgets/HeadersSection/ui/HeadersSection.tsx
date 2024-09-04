'use client';

import { useState } from 'react';
import Image from 'next/image';
import { nanoid } from 'nanoid';
import { useHeaders } from '@/features/store/store';
import { TwoInputs } from '@/shared/ui/TwoInputs/TwoInputs';
import IconPlus from '@/shared/assets/icons/plus-circle.svg';
import IconClose from '@/shared/assets/icons/x-circle.svg';
import styles from './HeadersSection.module.css';

export function HeadersSection() {
  const [HeadersId, setHeadersId] = useState<string[]>([]);
  const { addHeaderInStore, removeHeaderFromStore } = useHeaders();

  const createHeader = () => {
    const id = nanoid();
    setHeadersId([...HeadersId, id]);
    addHeaderInStore({ id, Key: '', Value: '' });
  };

  const removeHeader = (id: string) => {
    setHeadersId(HeadersId.filter((elem) => elem !== id));
    removeHeaderFromStore(id);
  };

  return (
    <div className={styles.container}>
      <div className={styles.titles}>
        <h3 className={styles.h3}>Headers</h3>
        <Image onClick={createHeader} className={styles.IconPlus} src={IconPlus} alt="Plus" width={25} height={25} />
      </div>
      {HeadersId.length > 0 && (
        <div className={styles.spanwrap}>
          <span className={styles.span}>Key</span>
          <span className={styles.span}>Value</span>
        </div>
      )}
      {HeadersId.map((id) => (
        <div key={id} className={styles.inputswrap}>
          <TwoInputs id={id} />
          <Image onClick={() => removeHeader(id)} className={styles.IconClose} src={IconClose} alt="Close" width={25} height={25} />
        </div>
      ))}
    </div>
  );
}
