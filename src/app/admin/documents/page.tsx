
import { Container } from 'react-bootstrap';

const adminDocuments = () => (
  <main>
    <Container id="landing-page" fluid className="mt-20 py-3">
      <h1 className="pt-1 text-center">Documents</h1>
    </Container>
    <Container>
      <div className="px-3">
        <p className="mb-3 text-gray-500 dark:text-gray-400">
          The role is actively responsible in the handling of new users and managing current ones.
          {' '}
        </p>
        <p className="text-gray-500 dark:text-gray-400">
          In the
          {' '}
          <a
            href="/admin"
            className="font-medium text-blue-600 underline hover:text-blue-700 hover:no-underline dark:text-blue-500"
          >
            admin overview page,
          </a>
          {' '}
          manage all accounts and roles.
          Here you can edit each account and modify their username, email, role, and sub role.
        </p>
      </div>
    </Container>
  </main>
);

export default adminDocuments;
