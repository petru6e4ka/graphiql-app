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
  setLanguage: (language) => set(() => ({ language: language })),
}));

function SwitchLang() {
  //const language = useLang((state) => state.language);
  const setLanguage = useLang((state) => state.setLanguage);

  return (
    <form className={style.form}>
      <label className={style.label}>
        <input type="radio" name="lang" defaultChecked={true} value="en" onChange={(e) => setLanguage(e.target.value)}></input>
        English
      </label>
      <label className={style.label}>
        <input type="radio" name="lang" value="ru" onChange={(e) => setLanguage(e.target.value)}></input>
        Russian
      </label>
    </form>
  );
}

export default SwitchLang;
