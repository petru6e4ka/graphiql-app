'use client';

import { useState, ReactNode, useMemo } from 'react';
import { signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth } from '../config/firebase';
import { User, AuthContext } from '../lib/AuthContext';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const googleSignUp = (signUpEmail: string, signUpPassword: string) => {
    createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword)
      .then(({ user: authUser }) => {
        const {
          accessToken, refreshToken, email, uid,
        } = authUser as never as User;

        setUser({
          accessToken,
          refreshToken,
          email: email as string,
          uid,
        });
        router.replace('./rest');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const googleSignIn = (signInEmail: string, signInPassword: string) => {
    signInWithEmailAndPassword(auth, signInEmail, signInPassword)
      .then(({ user: authUser }) => {
        const {
          accessToken, refreshToken, email, uid,
        } = authUser as never as User;

        setUser({
          accessToken,
          refreshToken,
          email: email as string,
          uid,
        });
        router.replace('./rest');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const logOut = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const value = useMemo(
    () => ({
      user,
      googleSignUp,
      googleSignIn,
      logOut,
    }),
    [user, googleSignUp, googleSignIn, logOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
