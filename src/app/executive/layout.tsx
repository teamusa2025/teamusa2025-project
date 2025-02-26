import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { executiveProtectedPage } from '@/lib/page-protection';
import { redirect } from 'next/navigation';
import { Subrole } from '@prisma/client';

/** Layout to protect the Executive page */
export default async function ExecutiveLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions) as {
    user: {
      email: string;
      id: string;
      randomKey: string;
      name?: string | null;
      image?: string | null;
      username: string;
      subrole: Subrole;
    };
  };

  if (!session) {
    redirect('/auth/signin');
  }

  try {
    executiveProtectedPage(session);
  } catch (error) {
    redirect('/not-authorized');
  }

  return children; // Render client-side Auditor UI only if authenticated
}
