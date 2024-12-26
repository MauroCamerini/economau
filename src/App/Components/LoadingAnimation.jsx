import * as React from 'react'
import { Spinner } from 'react-bootstrap'
import CenteredComponent from './CenteredComponent'

export default function LoadingAnimation() {
    return (<>
        <CenteredComponent>
            <Spinner animation='grow'/>
        </CenteredComponent>
        </>)
}