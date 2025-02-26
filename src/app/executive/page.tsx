'use client';

import { Container } from 'react-bootstrap';
import { getServerSession } from 'next-auth/next';
import { Session } from 'next-auth';
import { useEffect, useState } from 'react';
import { executiveProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';

/** The Executive page. */
const Executive = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [accessDenied, setAccessDenied] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const session = await getServerSession(authOptions);
        executiveProtectedPage(
          session as {
            user: { email: string; id: string; randomKey: string };
          } | null,
        );
        setSession(session);
      } catch (error) {
        setAccessDenied(true);
      }
    };

    fetchSession();
  }, []);

  if (accessDenied) {
    return <div>Access denied</div>;
  }

  if (!session) {
    return <div>Loading...</div>;
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
