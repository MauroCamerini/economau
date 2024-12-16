import * as React from 'react'
import DBResponse from './DBResponse'

/** 
 * Shows the error message or the given success message if response si positive.
 * @param {{success: Boolean, error?: String}} response A response object from the main proccess
 * @param {String} successMsg Message to be shown if response.success=true
 */
export default function ErrorMessage({errorMessage}) {

    return (<DBResponse response={{success: false, error: errorMessage}} />)
    
}