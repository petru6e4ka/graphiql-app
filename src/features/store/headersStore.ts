import { create } from 'zustand';

export type Header = {
  id: string;
  Key: string;
  Value: string;
};

type State = {
  Headers: Header[];
  addHeaderInStore: (obj: Header) => void;
  updateHeaderInStore: (obj: Header) => void;
  removeHeaderFromStore: (id: string) => void;
};

export const useHeaders = create<State>()((set, get) => ({
  Headers: [],
  addHeaderInStore: (obj) => {
    set({ Headers: [...get().Headers, obj] });
  },
  updateHeaderInStore: (obj) => {
    set({ Headers: get().Headers.map((item) => (obj.id === item.id ? obj : item)) });
  },
  removeHeaderFromStore: (id) => {
    set({ Headers: get().Headers.filter((item) => item.id !== id) });
  },
}));
