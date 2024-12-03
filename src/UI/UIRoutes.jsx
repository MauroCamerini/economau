import * as React from 'react'
import { routesConfig } from '../config/ui.config';
import { pages } from '../config/pages.config';
import { Routes, Route } from 'react-router-dom';


const renderRoutes = (routes) => 
    routes.map((route) => {
        if(route.children) { //It means has children
            return React.createElement(
                Route,
                {                
                    key: route.element,
                    path: route.path,
                    element: React.createElement(pages[route.element])
                },
                routes.index ? React.createElement(
                    Route, 
                    {
                        index: true, 
                        element: React.createElement(pages[route.element])
                    }
                ) : null,
                renderRoutes(route.children)
            )
        } 

        return React.createElement(
            Route,
            {
                key: route.element,
                path: route.path,
                element: React.createElement(pages[route.element]),
            }
        )        
    })


export default function UIRoutes() {
    
    return (
    <Routes>
        {renderRoutes(routesConfig)}
    </Routes>)
}