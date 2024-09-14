import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools, persist } from 'zustand/middleware';

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type RestRequest = {
  date: string;
  url: string;
  method: Method;
  headers: Record<string, string>;
  body: string;
  searchParams: Record<string, string>;
};

type State = {
  requests: [];
};

type Actions = {
  addRequest: (req: RestRequest) => void;
};

export const useHistoryStore = create<State & Actions>()(
  immer(
    devtools(
      persist(
        (set) => ({
          requests: [],
          addRequest: (newRequest: RestRequest) => set((state) => ({
            ...state,
            requests: [...state.requests, newRequest],
          })),
        }),
        { name: 'requests' },
      ),
    ),
  ),
);
