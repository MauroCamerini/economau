import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { DatabaseProvider } from '../Context/DatabaseContext';
import UIRoutes from './UIRoutes';


export default function UI() {

    return (
    <DatabaseProvider>
        <MemoryRouter>
            <UIRoutes />
        </MemoryRouter>
    </DatabaseProvider>
    )
}