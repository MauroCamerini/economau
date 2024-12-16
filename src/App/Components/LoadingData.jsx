import * as React from 'react'
import LoadingAnimation from './LoadingAnimation'
import DBResponse from './DBResponse'

export default function LoadingData({loading, error}) {
       
    return (<>
        {loading ? <LoadingAnimation /> : <DBResponse response={{success: !error, error}} />}
    </>)
    
}