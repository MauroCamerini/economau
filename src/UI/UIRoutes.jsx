import * as React from 'react'
import { routesConfig } from './ui.config';
import { pages } from './pages';
import { Routes, Route } from 'react-router-dom';


const renderRoutes = (routes) => 
    routes.map((route) => {
        console.log(route)
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