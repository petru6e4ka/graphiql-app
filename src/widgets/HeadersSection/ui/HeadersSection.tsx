'use client';

import { ReactNode } from 'react';
import Image from 'next/image';
import { nanoid } from 'nanoid';
import { TwoInputs } from '@/shared/ui';
import IconPlus from '@/shared/assets/icons/plus-circle.svg';
import IconClose from '@/shared/assets/icons/x-circle.svg';
import styles from './HeadersSection.module.css';

type Props = {
  children: ReactNode;
  items: Array<Record<string, string>>;
  add: (item: object) => void;
  remove: (id: string) => void;
  update: (item: object) => void;
};

export function HeadersSection({
  children, add, remove, update, items,
}: Props) {
  const createHeader = () => {
    const id = nanoid();

    add({ id, key: '', value: '' });
  };

  const removeHeader = (id: string) => {
    remove(id);
  };

  return (
    <div className={styles.container}>
      <div className={styles.titles}>
        <h3 className={styles.h3}>{children}</h3>
        <Image onClick={createHeader} className={styles.IconPlus} src={IconPlus} alt="Plus" width={25} height={25} />
      </div>
      {items.length > 0 && (
        <div className={styles.spanwrap}>
          <span className={styles.span}>Key</span>
          <span className={styles.span}>Value</span>
        </div>
      )}
      {items.map(({ id, name, value }) => (
        <div key={id} className={styles.inputswrap}>
          <TwoInputs id={id} update={update} name={name} value={value} />
          <Image onClick={() => removeHeader(id)} className={styles.IconClose} src={IconClose} alt="Close" width={25} height={25} />
        </div>
      ))}
    </div>
  );
}
