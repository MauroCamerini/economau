import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Routes, Route, MemoryRouter } from 'react-router-dom';
import Layout from './Pages/Layout';
import { DatabaseProvider } from './Context/DatabaseContext';
import NewTransaction from './Components/NewTransaction';
import ShowAllTransactions from './Components/ShowAllTransactions';

const root = createRoot(document.getElementById('app'));
root.render(<>
    <DatabaseProvider>
        <MemoryRouter>
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route index element={<NewTransaction />} />
                <Route path="/getall" element={<ShowAllTransactions />} />
            </Route>
        </Routes>
        </MemoryRouter>
    </DatabaseProvider>
</>);