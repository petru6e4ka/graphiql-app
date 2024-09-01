import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { FirestoreAdapter } from '@next-auth/firebase-adapter';
import { cert } from 'firebase-admin/app';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/app/firebase';

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/signin',
    error: '/error',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      async authorize(credentials): Promise<any> {
        return signInWithEmailAndPassword(auth, (credentials as { email: string }).email || '', (credentials as { password: string }).password || '')
          .then((userCredential) => {
            if (userCredential.user) {
              return userCredential.user;
            }
            return null;
          })
          .catch((error) => console.log(error))
          .catch((error) => {
            console.log(error);
          });
      },
    }),
  ],
  adapter: FirestoreAdapter({
    credential: cert({
      projectId: process.env.AUTH_FIREBASE_PROJECT_ID,
      clientEmail: process.env.AUTH_FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.AUTH_FIREBASE_PRIVATE_KEY,
    }),
  }),
  secret: process.env.NEXTAUTH_SECRET as string,
  session: {
    strategy: 'jwt',
  },
};

export default authOptions;
