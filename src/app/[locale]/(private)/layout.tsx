import { authOptions } from '@/features/authSwitcher';
import { getServerSession } from 'next-auth';
import { redirect } from '@/features/localeSwitcher';

export default async function WithAuth({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await getServerSession(authOptions);

  if (!data) {
    redirect('/signin');
  }

  return children;
}
