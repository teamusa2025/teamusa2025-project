'use client';

import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';
import { yupResolver } from '@hookform/resolvers/yup';
import { Role, Subrole, User } from '@prisma/client';
import { EditUserSchema } from '@/lib/validationSchemas';
import { editUser } from '@/lib/dbActions';

const onSubmit = async (data: User) => {
  // console.log(`onSubmit data: ${JSON.stringify(data, null, 2)}`);
  await editUser(data);
  swal('Success', 'Your item has been updated', 'success', {
    timer: 2000,
  });
};

const EditUserForm = ({ user }: { user: User }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<User>({
    resolver: yupResolver(EditUserSchema),
  });
  // console.log(user);

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center">
            <h2>Edit User</h2>
          </Col>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <input type="hidden" {...register('id')} value={user.id} />
                <Form.Group>
                  <Form.Label>Username</Form.Label>
                  <input
                    type="text"
                    {...register('username')}
                    defaultValue={user.username}
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
                    defaultValue={user.email}
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.email?.message}</div>
                </Form.Group>
                <input type="hidden" {...register('password')} value={user.password} />
                <Form.Group>
                  <Form.Label>Role</Form.Label>
                  <select
                    {...register('role')}
                    className={`form-control ${errors.role ? 'is-invalid' : ''}`}
                    defaultValue={user.role}
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
                    className={`form-control ${errors.subrole ? 'is-invalid' : ''}`}
                    defaultValue={user.subrole}
                  >
                    <option value={Subrole.ADMIN}>Admin</option>
                    <option value={Subrole.EXECUTIVE}>Executive</option>
                    <option value={Subrole.ANALYST}>Analyst</option>
                    <option value={Subrole.AUDITOR}>Auditor</option>
                  </select>
                  <div className="invalid-feedback">{errors.subrole?.message}</div>
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

export default EditUserForm;
