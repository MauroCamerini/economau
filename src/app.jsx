import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Routes, Route, MemoryRouter } from 'react-router-dom';
import Layout from './Pages/layout';
import { DatabaseProvider } from './Context/DatabaseContext';

const root = createRoot(document.getElementById('app'));
root.render(<>
    <DatabaseProvider>
        <MemoryRouter>
        <Routes>
            <Route path='/' element={<Layout />}>
            </Route>
        </Routes>
        </MemoryRouter>
    </DatabaseProvider>
</>);