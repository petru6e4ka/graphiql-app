'use client';

import Image from 'next/image';
import { nanoid } from 'nanoid';
import { useHeaders } from '@/features/store/store';
import { TwoInputs } from '@/shared/ui';
import IconPlus from '@/shared/assets/icons/plus-circle.svg';
import IconClose from '@/shared/assets/icons/x-circle.svg';
import styles from './HeadersSection.module.css';

export function HeadersSection() {
  const { addHeaderInStore, removeHeaderFromStore } = useHeaders();
  const headersFromStore = useHeaders((state) => state.Headers);

  const createHeader = (key: string, value: string) => {
    const id = nanoid();
    addHeaderInStore({ id, Key: key, Value: value });
  };

  return (
    <div className={styles.container}>
      <div className={styles.titles}>
        <h3 className={styles.h3}>Headers</h3>
        <Image onClick={() => createHeader('', '')} className={styles.IconPlus} src={IconPlus} alt="Plus" width={25} height={25} />
      </div>
      {headersFromStore.length > 0 && (
        <div className={styles.spanwrap}>
          <span className={styles.span}>Key</span>
          <span className={styles.span}>Value</span>
        </div>
      )}
      {headersFromStore.map((elem) => (
        <div key={elem.id} className={styles.inputswrap}>
          <TwoInputs id={elem.id} ky={elem.Key} value={elem.Value} />
          <Image onClick={() => removeHeaderFromStore(elem.id)} className={styles.IconClose} src={IconClose} alt="Close" width={25} height={25} />
        </div>
      ))}
    </div>
  );
}
