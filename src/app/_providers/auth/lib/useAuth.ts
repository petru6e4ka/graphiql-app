import { useContext } from 'react';
import { User, AuthContext } from './AuthContext';

type UseAuthResult = {
  user: User | null;
  googleSignUp: (signUpEmail: string, signUpPassword: string) => void;
  googleSignIn: (signUpEmail: string, signUpPassword: string) => void;
  logOut: () => void;
};

export function useAuth(): UseAuthResult {
  const {
    user, googleSignUp, googleSignIn, logOut,
  } = useContext(AuthContext);

  return {
    user,
    googleSignUp,
    googleSignIn,
    logOut,
  };
}

export default useAuth;
