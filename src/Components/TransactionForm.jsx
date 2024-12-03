import * as React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import LinkedFieldSelector from '../Components/LinkedFieldSelector';
import { DatabaseContext } from '../Context/DatabaseContext';

import { NewTransactionSchema } from '../utils/schema'
import { adaptTransactionData } from '../utils/ui';

const loadFormDefaultValues = async (trxID, linkedFields, dbfunctions) => {
    if(!trxID) {   // Update FORM
        return {
            Date: (new Date()).toISOString().split('T')[0],      // YYYY-DD-MM"
            Period: (new Date()).toISOString().slice(0,8),          // YYYY-DD
            Amount: 0,  
            Category: linkedFields.find((table) => table.TransactionField === "Category").Items[0].ID,               
            Type: linkedFields.find((table) => table.TransactionField === "Type").Items[0].ID,
            Account: linkedFields.find((table) => table.TransactionField === "Account").Items[0].ID,
            Contact: "", 
            ExtraData: "",
        }
    } else { // Insert FORM
        res = await dbfunctions.getTrxByID(trxID)
        return res.data
    }
}


export default function TransactionForm({trxID, submitResult}) {


    const {dbfunctions, linkedFields} = React.useContext(DatabaseContext)

    const getDefaultValues = React.useCallback(() => loadFormDefaultValues(
        trxID, linkedFields, dbfunctions), [trxID, linkedFields, dbfunctions])

    const {
            register,
            handleSubmit,
            formState: { errors, isSubmitted  }
        } = useForm({
            resolver: yupResolver(NewTransactionSchema),
            defaultValues: getDefaultValues
        })

    const onSubmit = React.useCallback((data) => {

        async function executeAction(data) {
            const adaptedData = adaptTransactionData(data)
            const res = trxID ? 
                await dbfunctions.updateTrx(trxID, adaptedData)
                :
                await dbfunctions.insertTrx(adaptedData)
            if(submitResult) submitResult(adaptedData, res)
        }
        executeAction(data)

    }, [trxID, submitResult, dbfunctions])

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
                        isInvalid={isSubmitted && !!errors.Date}
                        {...register("Date")}
                        />
                    <Form.Control.Feedback type='invalid'>{errors.Date?.message}</Form.Control.Feedback>
                </Form.Group>
            </Col>
            <Col>
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

            </Col>
            <Col>
                <Form.Group>
                    <Form.Label>Monto</Form.Label>
                    <Form.Control 
                        name='Amount'
                        isInvalid={isSubmitted && !!errors.Amount}
                        {...register("Amount")} />
                        <Form.Control.Feedback type='invalid'>{errors.Amount?.message}</Form.Control.Feedback>
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
