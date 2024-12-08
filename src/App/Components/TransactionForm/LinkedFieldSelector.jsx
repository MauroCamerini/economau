import * as React from 'react'
import { Col, Row } from "react-bootstrap";
import SelectLinkedField from './SelectLinkedField';
import useAsyncData from '../../Hooks/useAsyncData';

export default function LinkedFieldSelector({ register }) {

    const { loading, data, error } = useAsyncData('linked_fields')

    if(loading) return (<div>Cargando...</div>)

    if(error) return (<div>Error: {error}</div>)

    return (
        <Row>
        {data.map((linkedField) => (
            <Col key={linkedField.table_name}>
                <SelectLinkedField
                    linkedField={linkedField}
                    register={register}
                />
            </Col>
        ))}
        </Row>
    )
  }