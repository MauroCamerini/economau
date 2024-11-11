import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Routes, Route, MemoryRouter } from 'react-router-dom';
import Layout from './Pages/layout';
import Test from './Pages/Test';

const root = createRoot(document.getElementById('app'));
root.render(<>
    <MemoryRouter>
    <Routes>
        <Route path='/' element={<Layout />}>
            <Route path='test' element={<Test />} />
        </Route>
    </Routes>
    </MemoryRouter>
</>);