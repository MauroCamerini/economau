import * as React from 'react'
import { Button, ButtonGroup, Col, Form, Row } from 'react-bootstrap'
import { FilteredDataContext } from '../../Context/FilteredDataContext'


export default function SignFilter({field, disabled}) {
    const [sign, setSign] = React.useState(null)

    const { addFilter, removeFilter } = React.useContext(FilteredDataContext)

    React.useEffect(()=> {
        if(disabled) {
            setSign(null)
            removeFilter(field)
        } else {
            setSign('negative')
        }

    }, [disabled])

    React.useEffect(()=> {

        if(!disabled) {
            addFilter(field, 'sign', sign)
        }

    }, [sign])

    const handleClick = () => {
        setSign(prev => prev === 'positive' ? 'negative' : 'positive')
    }

    return (<>
        <ButtonGroup>
            <Button variant={disabled ? 
                    'secondary' : ((sign === 'positive') ? "success" : "danger")
                }
                disabled>
                {disabled ? 
                    'Sin filtro' : ((sign === 'positive') ? "Ingresos" : "Gastos")
                }
            </Button>
            <Button 
                onClick={handleClick}
                size="sm"
                disabled={disabled}
                variant='secondary'
                >
                    ↹
                </Button>
        </ButtonGroup>

    </>)
}