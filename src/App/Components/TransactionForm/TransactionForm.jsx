import * as React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import LinkedFieldSelector from './LinkedFieldSelector';
import { TransactionFormSchema } from './TransactionFormSchema';

export default function TransactionForm({onDBResponse}) {

    const {
            register,
            handleSubmit,
            formState: { errors, isSubmitted  }
        } = useForm({
            resolver: yupResolver(TransactionFormSchema),
        })

    const onSubmit = React.useCallback((data) => {

        async function executeAction(data) {
            const res = await window.ipc.newTransaction(data)
            if(onDBResponse) onDBResponse(res)
        }

        executeAction(data)

    }, [onDBResponse])

    return(<>

        <Container>
        <h2>Cargar transacción</h2>
        <Form onSubmit={handleSubmit(onSubmit)}>
        <Row className='mt-4'>
            <Col><LinkedFieldSelector register={register} /></Col>
        </Row>
        <Row className='mt-4'>
            <Col>
                <Form.Group>
                    <Form.Label>Fecha</Form.Label>
                    <Form.Control 
                        type='date' 
                        isInvalid={isSubmitted && !!errors.date}
                        {...register("date")}
                        />
                    <Form.Control.Feedback type='invalid'>{errors.date?.message}</Form.Control.Feedback>
                </Form.Group>
            </Col>
            <Col>
                <Form.Group>
                    <Form.Label>Periodo</Form.Label>
                    <Form.Control 
                        type='month'
                        placeholder='yyyy-mm' 
                        isInvalid={isSubmitted && !!errors.period}
                        {...register("period")}
                        />
                    <Form.Control.Feedback type='invalid'>{errors.period?.message}</Form.Control.Feedback>
                </Form.Group>

            </Col>
            <Col>
                <Form.Group>
                    <Form.Label>Monto</Form.Label>
                    <Form.Control 
                        isInvalid={isSubmitted && !!errors.amount}
                        {...register("amount")} />
                        <Form.Control.Feedback type='invalid'>{errors.amount?.message}</Form.Control.Feedback>
                </Form.Group>
            </Col>

            <Col className='d-flex justify-content-center align-items-center'>
                <Button type='submit'>Agregar</Button>
            </Col>
        </Row>
        </Form>
        </Container>
            
    </>)

}
