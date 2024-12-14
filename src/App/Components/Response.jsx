import * as React from 'react'
import { Card } from 'react-bootstrap'

/** 
 * Shows the error message or the given success message if response si positive.
 * @param {{success: Boolean, error?: String}} response A response object from the main proccess
 * @param {String} successMsg Message to be shown if response.success=true
 */
export default function Response({response, successMsg = null}) {

    return (<>{
        response && (!response.success || successMsg) && <> 
        <Card 
            bg={response.success ? 'success' : 'danger'}
            body>
            {response.success && successMsg}
            {!response.success && response.error}
        </Card>
        </>
    }</>)
    
}