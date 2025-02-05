'use client';

import { Container } from 'react-bootstrap';

/** The Auditor page. */
const Auditor = () => (
  <main>
    <Container id="landing-page" fluid className="mt-20 py-3">
      <h1 className="center">Mockup Page for Auditor Home Page</h1>
      <div className="center">
        <a href="/1">
          <button
            type="button"
            className="mb-2 me-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800"
          >
            Edit
          </button>
        </a>
      </div>
    </Container>
  </main>
);

export default Auditor;
