import * as React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { NewTransactionSchema } from '../utils/schema'



import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import LinkedFieldSelector from '../Components/LinkedFieldSelector';
import { DatabaseContext } from '../Context/DatabaseContext';

export default function NewTransaction () {

    const {dbfunctions} = React.useContext(DatabaseContext)

    const {
            register,
            handleSubmit,
            formState: { errors, isSubmitted  },
        } = useForm({
            resolver: yupResolver(NewTransactionSchema),
        })

    function adaptTransactionData(input) {
        return {
        Date: input.Date,
        Period: input.Period,
        Amount: parseInt(input.Amount.replace('.', ''), 10), // Convierte el monto a centavos como entero
        Category: parseInt(input.Category, 10), // Asegura que la categoría sea un número
        Type: input.Type,
        Account: input.Account,
        Contact: input.Contact === '' ? null : input.Contact , // Si Entity está vacío, asigna null
        ExtraData: null, // Campo opcional con valor predeterminado null
        };
    }


    const onSubmit = (data) => {
        console.log(errors)
        dbfunctions.insertTransaction(
            adaptTransactionData(data)).then(res => console.log(res)
        )
    }

    return(<>

        <Container>
        <h2>Cargar transacción</h2>
        <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
            
            <Col>
                <Form.Group controlId='formDate'>
                    <Form.Label>Fecha</Form.Label>
                    <Form.Control 
                        type='date' 
                        isInvalid={isSubmitted && !!errors.Date}
                        {...register("Date")}
                        />
                    <Form.Control.Feedback type='invalid'>{errors.Date?.message}</Form.Control.Feedback>
                </Form.Group>
                
                <Form.Group>
                    <Form.Label>Periodo</Form.Label>
                    <Form.Control 
                        type='month'
                        name='Period'
                        placeholder='yyyy-mm' 
                        isInvalid={isSubmitted && !!errors.Period}
                        {...register("Period")}
                        />
                    <Form.Control.Feedback type='invalid'>{errors.Period?.message}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Monto</Form.Label>
                    <Form.Control 
                        name='Amount'
                        isInvalid={isSubmitted && !!errors.Amount}
                        {...register("Amount")} />
                        <Form.Control.Feedback type='invalid'>{errors.Amount?.message}</Form.Control.Feedback>
                </Form.Group>
                <Button type='submit'>ENviar</Button>
            </Col>
            <Col><LinkedFieldSelector register={register} /></Col>
        </Row>
        </Form>
        </Container>
            
    </>)

}
