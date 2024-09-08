import { create } from 'zustand';

interface TypeHeader {
  id: string;
  Key: string;
  Value: string;
}
interface HeadersState {
  Headers: TypeHeader[];
  addHeaderInStore: (obj: TypeHeader) => void;
  updateHeaderInStore: (obj: TypeHeader) => void;
  removeHeaderFromStore: (id: string) => void;
}

export const useHeaders = create<HeadersState>()((set, get) => ({
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
