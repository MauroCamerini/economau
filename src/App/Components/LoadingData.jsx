import * as React from 'react'
import LoadingAnimation from './LoadingAnimation'
import Response from './Response'

export default function LoadingData({loading, data, error, children}) {
    
    if(loading) return <LoadingAnimation />
    
    return (<>
        <Response response={{success: !error, error}} />
        {children}
    </>)
    
}