import { authOptions } from '@/features/authSwitcher';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function WithoutAuth({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: {
    locale: string;
  };
}>) {
  const data = await getServerSession(authOptions);

  if (data) {
    redirect(`/${locale}`);
  }

  return children;
}
