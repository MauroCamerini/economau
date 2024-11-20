import * as React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { NewTransactionSchema } from '../utils/schema'



import { Button, Col, Container, Form, FormGroup, Row } from 'react-bootstrap';
import ListSelector from './ListSelector';
import { DatabaseContext } from '../Context/DatabaseContext';

export default function NewTransaction () {

    const {dbfunctions} = React.useContext(DatabaseContext)

    const {
            register,
            handleSubmit,
            setValue,
            formState: { errors },
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
        Contact: input.Entity || null, // Si Entity está vacío, asigna null
        ExtraData: null, // Campo opcional con valor predeterminado null
        };
    }


    const onSubmit = (data) => {
        console.log(data)
        dbfunctions.insertTransaction(adaptTransactionData(data)).then(res => console.log(res))
    }

    React.useEffect(()=> console.log(errors), [errors])

    return(<>

        <Container>
        <h2>Cargar transacción</h2>
        <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
            <Col><ListSelector register={register} setValue={setValue}/></Col>
            <Col>
                <FormGroup>
                    <Form.Label>Fecha</Form.Label>
                    <Form.Control type='date' name='Date' {...register("Date")}/>
                </FormGroup>
                <FormGroup>
                    <Form.Label>Periodo</Form.Label>
                    <Form.Control type='month' name='Period' placeholder='yyyy-mm' {...register("Period")}/>
                </FormGroup>
                <FormGroup>
                    <Form.Label>Monto</Form.Label>
                    <Form.Control name='Amount' {...register("Amount")} />
                </FormGroup>
                <Button type='submit'>ENviar</Button>
            </Col>
        </Row>
        {errors && <h2>ERROR EN EL FORM</h2>}
        </Form>
        </Container>
            
    </>)

}
