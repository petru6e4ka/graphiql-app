import { authOptions } from '@/features/authSwitcher';
import { getServerSession } from 'next-auth';
import { redirect } from '@/features/localeSwitcher';

export default async function WithoutAuth({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await getServerSession(authOptions);

  if (data) {
    redirect('/');
  }

  return children;
}
