import { getServerSession } from 'next-auth';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import StuffItem from '@/components/StuffItem';
import { loggedInProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';

/** Render a list of stuff for the logged in user. */
const ListPage = async () => {
  // Protect the page; only logged in users can access it.
  // Update the type to include the username field.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; username: string; randomKey: string };
    } | null,
  );

  // Extract owner's email and username from the session.
  const owner = session?.user?.email || '';
  const username = session?.user?.username || '';

  const stuff = await prisma.stuff.findMany({
    where: { owner },
  });

  return (
    <main>
      <Container id="list" fluid className="mt-20 py-3">
        <Row>
          <Col>
            <h1>
              Stuff for
              {username}
            </h1>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Condition</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {stuff.map((item) => (
                  <StuffItem key={item.id} {...item} />
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default ListPage;
