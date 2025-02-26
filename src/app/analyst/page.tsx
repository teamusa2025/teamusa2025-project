'use client';

import AnalystSidebar from '@/components/AnalystSidebar';
import { ReactNode, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { analystProtectedPage } from '@/lib/page-protection';

interface AnalystProps {
  children: ReactNode;
}

/** The Analyst page. */
// eslint-disable-next-line react/prop-types
const Analyst: React.FC<AnalystProps> = ({ children }) => {
  const { data: session, status } = useSession();
  const [accessDenied, setAccessDenied] = useState(false);

  useEffect(() => {
    if (status === 'loading') return;

    try {
      analystProtectedPage(
        session as {
          user: { email: string; id: string; randomKey: string };
        } | null,
      );
    } catch (error) {
      setAccessDenied(true);
    }
  }, [session, status]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (accessDenied) {
    return <div>Access denied</div>;
  }

  return (
    <div>
      <AnalystSidebar />
      <main>{children}</main>
    </div>
  );
};

export default Analyst;
