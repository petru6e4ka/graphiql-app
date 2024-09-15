import { NextAuthOptions, User } from 'next-auth';
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
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials): Promise<User | null> {
        return signInWithEmailAndPassword(auth, credentials!.email || '', credentials!.password || '')
          .then((userCredential) => {
            if (userCredential.user) {
              return { id: userCredential.user.uid, ...userCredential.user };
            }

            return null;
          })
          .catch(() => null)
          .catch(() => null);
      },
    }),
  ],
  adapter: FirestoreAdapter({
    credential: cert({
      projectId: process.env.AUTH_FIREBASE_PROJECT_ID,
      clientEmail: process.env.AUTH_FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.AUTH_FIREBASE_PRIVATE_KEY?.replace(/\\n/gm, '\n'),
    }),
  }),
  secret: process.env.NEXTAUTH_SECRET as string,
  session: {
    strategy: 'jwt',
  },
};

export default authOptions;
