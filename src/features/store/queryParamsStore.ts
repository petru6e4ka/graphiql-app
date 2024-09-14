import { create } from 'zustand';

export type Query = {
  id: string;
  Key: string;
  Value: string;
};

type State = {
  Query: Query[];
  addQueryInStore: (obj: Query) => void;
  updateQueryInStore: (obj: Query) => void;
  removeQueryFromStore: (id: string) => void;
};

export const useQueryParams = create<State>()((set, get) => ({
  Query: [],
  addQueryInStore: (obj) => {
    set({ Query: [...get().Query, obj] });
  },
  updateQueryInStore: (obj) => {
    set({ Query: get().Query.map((item) => (obj.id === item.id ? obj : item)) });
  },
  removeQueryFromStore: (id) => {
    set({ Query: get().Query.filter((item) => item.id !== id) });
  },
}));
