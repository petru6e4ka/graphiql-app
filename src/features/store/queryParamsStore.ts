import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type Query = {
  id: string;
  name: string;
  value: string;
};

type State = {
  query: Query[];
};

type Actions = {
  addQueryInStore: (obj: Query) => void;
  updateQueryInStore: (obj: Query) => void;
  removeQueryFromStore: (id: string) => void;
  cleanQuery: () => void;
};

export const useQueryParams = create<State & Actions>()(
  devtools((set, get) => ({
    query: [],
    addQueryInStore: (obj) => {
      set({ query: [...get().query, obj] });
    },
    updateQueryInStore: (obj) => {
      set({ query: get().query.map((item) => (obj.id === item.id ? obj : item)) });
    },
    removeQueryFromStore: (id) => {
      set({ query: get().query.filter((item) => item.id !== id) });
    },
    cleanQuery: () => {
      set({ query: [] });
    },
  })),
);
