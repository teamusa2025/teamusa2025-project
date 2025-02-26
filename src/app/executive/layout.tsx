import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { executiveProtectedPage } from '@/lib/page-protection';
import { redirect } from 'next/navigation';

/** Layout to protect the Executive page */
export default async function ExecutiveLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/auth/signin');
  }

  if (!executiveProtectedPage) {
    redirect('/not-authorized');
  }

  return children; // Render client-side Executive UI only if authenticated
}
