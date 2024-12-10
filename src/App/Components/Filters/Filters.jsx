import * as React from 'react'
import { filtersConfig } from '../../config';
import {  Accordion, AccordionHeader, Row, Col } from 'react-bootstrap';
import FilterSwitch from './FilterSwitch';

export default function Filters() {

    return (<>
        <Accordion>
        <Accordion.Item eventKey="0">
            <AccordionHeader>Filtros</AccordionHeader>
            <Accordion.Body>
                <Row>
                    {Object.entries(filtersConfig).map(([field, filter]) => 
                        <Col key={field}>
                            <FilterSwitch field={field} filter={filter} />
                        </Col>
                    )}
                </Row>
            </Accordion.Body>
        </Accordion.Item>
        </Accordion>
    </>)
}