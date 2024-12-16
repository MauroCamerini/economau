import * as React from 'react'
import { Container } from 'react-bootstrap'

export default function CenteredComponent({children}) {
    
    return (
        <Container className="container-fluid d-flex justify-content-center">
            {children}
        </Container>
    )
}