import * as React from 'react'
import { Card, Container } from 'react-bootstrap'
import CenteredComponent from './CenteredComponent'

/** 
 * Shows the error message or the given success message if response si positive.
 * @param {{success: Boolean, error?: String}} response A response object from the main proccess
 * @param {String} successMsg Message to be shown if response.success=true
 */
export default function DBResponse({ dbResponse, successMsg = null}) {

    return (<>{
        dbResponse && (!dbResponse.success || successMsg) && <> 
        <CenteredComponent>
        <Card 
            border={dbResponse.success ? 'success' : 'danger'}
            text={dbResponse.success ? 'success' : 'danger'}
            body>
            {dbResponse.success && successMsg}
            {!dbResponse.success && dbResponse.error}
        </Card>
        </CenteredComponent>
        </>
    }</>)
    
}