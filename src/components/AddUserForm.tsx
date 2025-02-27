'use client';

// import { useSession } from 'next-auth/react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import swal from 'sweetalert';
// import { redirect } from 'next/navigation';
import { addUser } from '@/lib/dbActions';
// import LoadingSpinner from '@/components/LoadingSpinner';
import { AddUserSchema } from '@/lib/validationSchemas';
import { $Enums, Role, Subrole } from '@prisma/client';

type NewUser = {
  password: string;
  username: string;
  email: string;
  role: $Enums.Role;
  subrole: $Enums.Subrole;
};

const onSubmit = async (data: NewUser) => {
  // console.log(`onSubmit data: ${JSON.stringify(data, null, 2)}`);
  await addUser(data);
  swal('Success', 'The user has been added', 'success', {
    timer: 2000,
  });
};

const AddUserForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewUser>({
    resolver: yupResolver(AddUserSchema),
  });
  // if (status === 'loading') {
  //   return <LoadingSpinner />;
  // }
  // if (status === 'unauthenticated') {
  //   redirect('/auth/signin');
  // }

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center">
            <h2>Add User</h2>
          </Col>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                  <Form.Label>Username</Form.Label>
                  <input
                    type="text"
                    {...register('username')}
                    required
                    className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.username?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <input
                    type="text"
                    {...register('email')}
                    required
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.email?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <input
                    type="text"
                    {...register('password')}
                    required
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.password?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Role</Form.Label>
                  <select
                    {...register('role')}
                    required
                    className={`form-control ${errors.role ? 'is-invalid' : ''}`}
                  >
                    <option value={Role.USER}>User</option>
                    <option value={Role.ADMIN}>Admin</option>
                  </select>
                  <div className="invalid-feedback">{errors.role?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Subrole</Form.Label>
                  <select
                    {...register('subrole')}
                    required
                    className={`form-control ${errors.subrole ? 'is-invalid' : ''}`}
                  >
                    <option value={Subrole.ADMIN}>Admin</option>
                    <option value={Subrole.EXECUTIVE}>Executive</option>
                    <option value={Subrole.ANALYST}>Analyst</option>
                    <option value={Subrole.AUDITOR}>Auditor</option>
                  </select>
                  <div className="invalid-feedback">{errors.role?.message}</div>
                </Form.Group>
                <Form.Group className="form-group">
                  <Row className="pt-3">
                    <Col>
                      <Button type="submit" variant="primary">
                        Submit
                      </Button>
                    </Col>
                    <Col>
                      <Button type="button" onClick={() => reset()} variant="warning" className="float-right">
                        Reset
                      </Button>
                    </Col>
                  </Row>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddUserForm;
