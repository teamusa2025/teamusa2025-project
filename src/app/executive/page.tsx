'use client';

import { Container } from 'react-bootstrap';
import { useSession } from 'next-auth/react';

/** The Executive Page */
export default function Executive() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <Container id="landing-page" fluid className="mt-20 py-3">
        <h1>
          Welcome,
          <br />
          {session?.user?.email}
        </h1>
        <p>You now have access to protected executive content.</p>
        <br />
      </Container>
    </main>
  );
}
