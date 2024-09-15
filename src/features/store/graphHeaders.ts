import { create } from 'zustand';

export type Header = {
  id: string;
  name: string;
  value: string;
};

type State = {
  headers: Header[];
};

type Actions = {
  addHeaderInStoreGQL: (obj: Header) => void;
  updateHeaderInStore: (obj: Header) => void;
  removeHeaderFromStore: (id: string) => void;
  cleanHeadersGQL: () => void;
};

export const useGraphHeaders = create<State & Actions>()((set, get) => ({
  headers: [],
  addHeaderInStoreGQL: (obj) => {
    set({ headers: [...get().headers, obj] });
  },
  updateHeaderInStore: (obj) => {
    set({ headers: get().headers.map((item) => (obj.id === item.id ? obj : item)) });
  },
  removeHeaderFromStore: (id) => {
    set({ headers: get().headers.filter((item) => item.id !== id) });
  },
  cleanHeadersGQL: () => {
    set({ headers: [] });
  },
}));
