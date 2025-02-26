'use client';

import { Container } from 'react-bootstrap';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { executiveProtectedPage } from '@/lib/page-protection';

/** The Executive page. */
const Executive = () => {
  const { data: session, status } = useSession();
  const [accessDenied, setAccessDenied] = useState(false);

  useEffect(() => {
    if (status === 'loading') return;

    try {
      executiveProtectedPage(
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
    <main>
      <Container id="landing-page" fluid className="mt-20 py-3">
        <h1>This is the Executive Page</h1>
      </Container>
    </main>
  );
};

export default Executive;
