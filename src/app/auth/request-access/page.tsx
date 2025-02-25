// page.tsx

'use client';

import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import swal from 'sweetalert';
import { Card, Col, Container, Button, Form, Row } from 'react-bootstrap';
import { requestAccess } from '@/lib/dbActions';
import LoadingSpinner from '@/components/LoadingSpinner';

type RequestAccessForm = {
  fullName: string;
  email: string;
  reason: string;
};

const RequestAccess = () => {
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email || '';

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Full name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    reason: Yup.string().required('Reason is required').min(10, 'Reason must be at least 10 characters'),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RequestAccessForm>({
    resolver: yupResolver(validationSchema),
    defaultValues: { email: userEmail },
  });

  const onSubmit = async (data: RequestAccessForm) => {
    try {
      await requestAccess(data);
      await swal('Request Submitted', 'Your access request has been sent for review', 'success', { timer: 2000 });
      reset();
    } catch (error) {
      swal('Error', 'Something went wrong. Please try again later.', 'error');
    }
  };

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  return (
    <main>
      <Container className="mt-36">
        <Row className="justify-content-center">
          <Col xs={5}>
            <h1 className="text-center">Request Access</h1>
            <Card>
              <Card.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group className="form-group">
                    <Form.Label>Full Name</Form.Label>
                    <input
                      type="text"
                      {...register('fullName')}
                      className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.fullName?.message}</div>
                  </Form.Group>

                  <Form.Group className="form-group">
                    <Form.Label>Email</Form.Label>
                    <input
                      type="email"
                      {...register('email')}
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      disabled={!!userEmail}
                    />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                  </Form.Group>

                  <Form.Group className="form-group">
                    <Form.Label>Reason for Access</Form.Label>
                    <textarea
                      {...register('reason')}
                      className={`form-control ${errors.reason ? 'is-invalid' : ''}`}
                      rows={3}
                    />
                    <div className="invalid-feedback">{errors.reason?.message}</div>
                  </Form.Group>

                  <Form.Group className="form-group py-3">
                    <Row>
                      <Col>
                        <Button type="submit" className="btn btn-primary">
                          Submit Request
                        </Button>
                      </Col>
                      <Col>
                        <Button type="button" onClick={() => reset()} className="btn btn-warning float-right">
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
    </main>
  );
};

export default RequestAccess;
