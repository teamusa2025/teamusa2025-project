import { getServerSession } from 'next-auth';
import { Col, Container, Row } from 'react-bootstrap';
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
      <Container id="list" fluid className="mt-10 py-3">
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
                    <th scope="col" className="px-6 py-3">
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
            </div>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default AdminPage;
