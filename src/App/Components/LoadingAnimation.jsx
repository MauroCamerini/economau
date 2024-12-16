import * as React from 'react'
import { Spinner } from 'react-bootstrap'

export default function LoadingAnimation({loading}) {
    return (<>{
        loading && 
        <CenteredComponent>
            <Spinner animation='grow'/>
        </CenteredComponent>
        }</>)
}