import React, { ReactNode } from 'react';
import cls from './styles.module.css';

interface Props {
  value: string;
  children: ReactNode;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

function LocaleSwitcherSelector({ value, onChange, children }: Props) {
  return (
    <div className={cls.languageSwitcher}>
      <select id="locale-switcher" value={value} onChange={onChange}>
        {children}
      </select>
    </div>
  );
}

export default LocaleSwitcherSelector;
