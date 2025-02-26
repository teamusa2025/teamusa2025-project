'use client';

import { Container } from 'react-bootstrap';
import { getServerSession } from 'next-auth';
import { useEffect } from 'react';
import { executiveProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';

/** The Executive page. */
const Executive = () => {
  useEffect(() => {
    const fetchSession = async () => {
      const session = await getServerSession(authOptions);
      try {
        executiveProtectedPage(
          session as {
            user: { email: string; id: string; randomKey: string };
          } | null,
        );
        return session;
      } catch (error) {
        return <div>Access denied</div>;
      }
    };

    fetchSession();
  }, []);

  return (
    <main>
      <Container id="landing-page" fluid className="mt-20 py-3">
        <h1>This is the Executive Page</h1>
      </Container>
    </main>
  );
};

export default Executive;
