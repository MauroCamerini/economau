import * as React from 'react';
import { Form } from 'react-bootstrap';
import useAsyncData from '../../Hooks/useAsyncData';
import { labels } from '../../config';



export default function SelectLinkedField({linkedField, register}){

    const { loading, data, error } = useAsyncData(`${linkedField.field_name}_items`)

    if(loading) return (<div>Cargando...</div>)

    if(error) return (<div>Error: {error}</div>)

    return (
        <Form.Group>
            <Form.Label>{labels.transactions_view[linkedField.field_name]}</Form.Label>
            <Form.Control 
                as="select" 
                {...register(linkedField.field_name)} 
                >
                {!linkedField.is_required && (
                    <option value=''>* Ninguno</option>
                )}
                {data.map((item) => (
                    <option key={item.id} value={item.id}>
                    {`${'> '.repeat(item?.depth||0)} ${item.name}`} 
                    </option>
                ))}
            </Form.Control>
        </Form.Group>
    )

}
