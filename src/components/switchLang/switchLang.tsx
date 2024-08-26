'use client';

import { create } from 'zustand';
import style from './switchLang.module.css';

type State = {
  language: string;
};
type Action = {
  setLanguage: (language: State['language']) => void;
};

export const useLang = create<State & Action>((set) => ({
  language: 'en',
  setLanguage: (language) => set(() => ({ language })),
}));

const languages = [
  { name: 'English', value: 'en' },
  { name: 'Russian', value: 'ru' },
  { name: 'Deutsch', value: 'de' },
];

function SwitchLang() {
  const setLanguage = useLang((state) => state.setLanguage);

  return (
    <form className={style.form}>
      {languages.map((elem, i) => (
        <label className={style.label} key={elem.value} htmlFor={elem.value}>
          <input type="radio" name="lang" defaultChecked={i === 0} value={elem.value} onChange={(e) => setLanguage(e.target.value)} id={elem.value} />
          {elem.name}
        </label>
      ))}
    </form>
  );
}

export default SwitchLang;
