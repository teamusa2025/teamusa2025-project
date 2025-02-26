import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { auditorProtectedPage } from '@/lib/page-protection';
import { redirect } from 'next/navigation';

/** Layout to protect the Auditor page */
export default async function AuditorLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/auth/signin');
  }

  if (!auditorProtectedPage) {
    redirect('/not-authorized');
  }

  return children; // Render client-side Auditor UI only if authenticated
}
