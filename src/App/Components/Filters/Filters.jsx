import * as React from 'react'
import { filtersConfig } from '../../config';
import { Card, Col, Row } from 'react-bootstrap';
import FilterSwitch from './FilterSwitch';

export default function Filters() {

    return (<>
    <Card>   
    <Card.Body>
        <Card.Title>Filtros</Card.Title>
        <Card.Text as='div'>
        <Row>
            {Object.entries(filtersConfig).map(([field, filter]) => 
                <Col key={field}>
                    <FilterSwitch field={field} filter={filter} />
                </Col>
            )}
        </Row>
        </Card.Text>
    </Card.Body>
    </Card>
    </>)
}