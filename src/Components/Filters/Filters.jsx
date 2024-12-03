import * as React from 'react'
import { transactionTableConfig } from "../../config/ui.config";
import { Button, Card, Col, Row } from 'react-bootstrap';
import FilterSwitch from './FilterSwitch';

/*
import PickFilter from "./PickFilter"

const filterComponents = {
    pick: PickFilter
}*/

export default function Filters() {
    
    const [filters, setFilters] = React.useState({})

    const handleFilterChange = (field, filter, value) => {

        if(!filter && filters && Object.hasOwn(filters, field)) {
            setFilters(prev => {
                const newFilters = {...prev}
                delete newFilters[field]
                return newFilters
            })
        } else {
            setFilters(prev => {
                const newFilters = {...prev}
                newFilters[field] ={
                    [filter]: value                    
                }

                return newFilters
            })
        }

    }

    return (<>
    <Card>   
    <Card.Body>
        <Card.Title>Filtros</Card.Title>
        <Card.Text as='div'>
        <Row>
            {transactionTableConfig.columns.filter(val => !!val.filter).map((col) => 
                <Col key={col.field}>
                    <FilterSwitch col={col} onFilterChange={handleFilterChange} />
                </Col>
            )}
        </Row>
        <Button onClick={() => console.log(filters)}>Filtrar</Button>
        </Card.Text>
    </Card.Body>
    </Card>
    </>)
}