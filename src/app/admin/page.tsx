import { getServerSession } from 'next-auth';
import { Col, Container, Row, Table } from 'react-bootstrap';
import UserRowAdmin from '@/components/UserRowAdmin';
import { prisma } from '@/lib/prisma';
import { adminProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';

const AdminPage = async () => {
  const session = await getServerSession(authOptions);
  try {
    adminProtectedPage(
      session as {
        user: { email: string; id: string; randomKey: string };
      } | null,
    );
  } catch (error) {
    return <div>Access denied</div>;
  }

  const users = await prisma.user.findMany({});
  return (
    <main>
      <Container id="list" fluid className="mt-20 py-3">
        <Row>
          <Col>
            <h4>Accounts Management</h4>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Subrole</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <UserRowAdmin key={user.id} {...user} />
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default AdminPage;
