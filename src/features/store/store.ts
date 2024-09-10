import { create } from 'zustand';

interface TypeRequest {
  date: string;
  url: string;
  method: string;
  headers: Record<string, string>;
  body: string;
  searchParams: Record<string, string>;
}
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
  cleanHeaders: () => void;
}
interface HistoryState {
  HistoryRequest: TypeRequest | null;
  addHistoryInStore: (obj: TypeRequest) => void;
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
  cleanHeaders: () => {
    set({ Headers: [] });
  },
}));

export const useHistory = create<HistoryState>()((set) => ({
  HistoryRequest: null,
  addHistoryInStore: (obj) => {
    set({ HistoryRequest: obj });
  },
}));
