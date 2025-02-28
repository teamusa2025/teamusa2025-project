import { getServerSession } from 'next-auth';
import { Col, Container, Row, Button } from 'react-bootstrap';
import UserRowAdmin from '@/components/UserRowAdmin';
import { prisma } from '@/lib/prisma';
import { adminProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';
import { redirect } from 'next/navigation';
import { Subrole } from '@prisma/client';

const AdminPage = async () => {
  const session = (await getServerSession(authOptions)) as {
    user: {
      email: string;
      id: string;
      randomKey: string;
      name?: string | null;
      image?: string | null;
      username: string;
      subrole: Subrole;
    };
  };
  if (!session) {
    redirect('/auth/signin');
  }

  try {
    adminProtectedPage(session);
  } catch (error) {
    redirect('/not-authorized');
  }

  const users = await prisma.user.findMany({});

  return (
    <main>
      <Container id="list" fluid className="mt-20 py-3">
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
                    <th scope="col" className="px-2 py-3">
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <UserRowAdmin key={user.id} {...user} />
                  ))}
                </tbody>
              </table>
              <Button href="#" size="lg" className="px-6 py-3 text-blue-600 hover:underline">
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
