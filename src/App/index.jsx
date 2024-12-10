import * as React from 'react';
import { MemoryRouter } from 'react-router-dom'
import AppRoutes from './AppRoutes';


/**
 * React App entry point, builds routes
 */
export default function App() {

    return (
        <MemoryRouter>
            <AppRoutes />
        </MemoryRouter>
    )
}