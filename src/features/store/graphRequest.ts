import { create } from 'zustand';

type State = {
  queryGraphQL: string;
  variablesGraphQL: string;
};

type Actions = {
  addQueryGraphQL: (query: string) => void;
  addVariablesGraphQL: (variable: string) => void;
  clearGraphRequest: () => void;
};

export const useGraphRequest = create<State & Actions>()((set) => ({
  queryGraphQL: '',
  variablesGraphQL: '',
  addQueryGraphQL: (query: string) => {
    set(() => ({ queryGraphQL: query }));
  },
  addVariablesGraphQL: (variable: string) => {
    set(() => ({ variablesGraphQL: variable }));
  },
  clearGraphRequest: () => {
    set(() => ({ queryGraphQL: '', variablesGraphQL: '' }));
  },
}));
