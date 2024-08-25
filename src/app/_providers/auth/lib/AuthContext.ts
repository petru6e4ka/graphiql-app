'use client';

import { createContext } from 'react';

export type User = {
  email: string;
  accessToken: string;
  refreshToken: string;
  uid: string;
};

export interface AuthContextProps {
  user: User | null;
  googleSignUp: (signUpEmail: string, signUpPassword: string) => void;
  googleSignIn: (signUpEmail: string, signUpPassword: string) => void;
  logOut: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  googleSignUp: () => {},
  googleSignIn: () => {},
  logOut: () => {},
});
export default AuthContext;
