import { getServerSession } from 'next-auth';
import { Col, Container, Row, Table } from 'react-bootstrap';
import UserRowAdmin from '@/components/UserRowAdmin';
import { prisma } from '@/lib/prisma';
import { adminProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';

const AdminPage = async () => {
  const session = await getServerSession(authOptions);
  adminProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );
  // const stuff = await prisma.stuff.findMany({});
  const users = await prisma.user.findMany({});
  return (
    <main>
      <Container id="list" fluid className="mt-20 py-3">
        <Row>
          {/* IMPLEMENT BELOW IN ANOTHER PAGE OR DELETE */}
          {/* <Col>
            <h1>Admin</h1>
            <h4 className="mt-10">Income Statement (Audited Data)</h4>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Revenue</th>
                  <th>Net Sales (calculate)</th> 
                  COMMENTED Cost of Goods sold
                  <th>Cost of Contracting</th>
                  <th>Overhead</th>
                  <th>Cost of Goods sold (calculate)</th>
                  <th>Gross profit (calculate)</th>
                  <th>Gross margin % (calculate)</th>
                  COMMENTED Operating expenses
                  </tr>
              </thead>
              <tbody>
                {stuff.map((item) => (
                  <StuffItemAdmin key={item.id} {...item} />
                ))}
              </tbody>
            </Table>
          </Col> */}
        </Row>
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
