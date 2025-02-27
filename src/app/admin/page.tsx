import { getServerSession } from 'next-auth';
import { Col, Container, Row } from 'react-bootstrap';
import UserRowAdmin from '@/components/UserRowAdmin';
import { prisma } from '@/lib/prisma';
import { adminProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';
import { Button } from '@mui/material';

const AdminPage = async () => {
  const session = await getServerSession(authOptions);
  adminProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );
  const users = await prisma.user.findMany({});

  return (
    <main>
      <Container id="list" fluid className="mt-10 py-3">
        <Row>
          <Col>
            <span className="center text-2xl">Admin Dashboard | Accounts</span>
            <div className="relative mt-4 overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
                <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Username
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Role
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Subrole
                    </th>
                    <th scope="col" className="px-10 py-3">
                      Edit
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <UserRowAdmin key={user.id} {...user} />
                  ))}
                </tbody>
              </table>
              <Button href="/add-user" size="large" className="px-6 py-3 text-blue-600 hover:underline">
                Add User
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default AdminPage;
