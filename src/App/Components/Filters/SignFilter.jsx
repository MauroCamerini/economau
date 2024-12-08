import * as React from 'react'
import { Button } from 'react-bootstrap'
import { TransactionsContext } from '../../Context/TransactionsContext'


export default function SignFilter({field, disabled}) {
    const [sign, setSign] = React.useState(null)

    const { addFilter, removeFilter } = React.useContext(TransactionsContext)

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

            <Button 
                variant={disabled ? '' : ( (sign === 'positive') ? 'success' : 'danger')}
                onClick={handleClick}
                size="sm"
                disabled={disabled}
                >
                    {disabled ? 'Sin filtro' : ((sign === 'positive') ? "Ingresos" : "Gastos") }
                </Button>
    </>)
}