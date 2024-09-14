import { create } from 'zustand';
import { Method } from '@/shared/types/Method';

type State = {
  method: Method;
  url: string;
  body: string;
};

type Actions = {
  addMethod: (method: Method) => void;
  addUrl: (url: string) => void;
  addBody: (body: string) => void;
  clearData: () => void;
};

export const useRestRequest = create<State & Actions>()((set) => ({
  method: 'GET',
  url: '',
  body: '',
  addMethod: (method: Method) => {
    set((state) => ({ ...state, method }));
  },
  addUrl: (url: string) => {
    set((state) => ({ ...state, url }));
  },
  addBody: (body: string) => {
    set((state) => ({ ...state, body }));
  },
  clearData: () => {
    set(() => ({ method: 'GET', url: '', body: '' }));
  },
}));
