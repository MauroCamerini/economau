import * as React from 'react'
import { transactionTableConfig } from "../../config/ui.config";
import { Card, Col, Row } from 'react-bootstrap';
import FilterSwitch from './FilterSwitch';

/**
 * Creates the filter components according to the transcion table config in the UI configuration.
 */
export default function Filters() {

    return (<>
    <Card>   
    <Card.Body>
        <Card.Title>Filtros</Card.Title>
        <Card.Text as='div'>
        <Row>
            {transactionTableConfig.columns.filter(val => !!val.filter).map((col) => 
                <Col key={col.field}>
                    <FilterSwitch col={col} />
                </Col>
            )}
        </Row>
        </Card.Text>
    </Card.Body>
    </Card>
    </>)
}