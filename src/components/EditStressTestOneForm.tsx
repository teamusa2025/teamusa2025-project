'use client';

import React from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';
import type { StressTestOneInput } from '@prisma/client';
import { updateStressTestOneInput } from '@/lib/dbActions';

interface EditStressTestOneFormProps {
  initialData: StressTestOneInput;
}

type FormValues = {
  presentValue: number;
  interestRate: number;
  termYears: number;
  monthlyContributionPercent: number;
};

const EditStressTestOneForm: React.FC<EditStressTestOneFormProps> = ({ initialData }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      presentValue: initialData.presentValue,
      interestRate: initialData.interestRate,
      termYears: initialData.termYears,
      monthlyContributionPercent: initialData.monthlyContributionPercent,
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await updateStressTestOneInput({
        presentValue: data.presentValue,
        interestRate: data.interestRate,
        termYears: data.termYears,
        monthlyContributionPercent: data.monthlyContributionPercent,
      });
      swal('Success', 'Stress test values updated', 'success', { timer: 2000 });
    } catch (e: any) {
      swal('Error', e.message || 'Update failed', 'error');
    }
  };

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={6}>
          <h2 className="mb-4 text-center">Edit Stress Test Inputs</h2>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                  <Form.Label>Present Value</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    {...register('presentValue')}
                    isInvalid={!!errors.presentValue}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.presentValue?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Interest Rate (%)</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    {...register('interestRate')}
                    isInvalid={!!errors.interestRate}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.interestRate?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Term (years)</Form.Label>
                  <Form.Control
                    type="number"
                    {...register('termYears')}
                    isInvalid={!!errors.termYears}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.termYears?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Monthly Contribution (%)</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    {...register('monthlyContributionPercent')}
                    isInvalid={!!errors.monthlyContributionPercent}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.monthlyContributionPercent?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Row>
                  <Col>
                    <Button type="submit" variant="primary" disabled={isSubmitting}>
                      {isSubmitting ? 'Saving...' : 'Save'}
                    </Button>
                  </Col>
                  <Col className="text-end">
                    <Button type="button" variant="secondary" onClick={() => reset()}>
                      Reset
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EditStressTestOneForm;
