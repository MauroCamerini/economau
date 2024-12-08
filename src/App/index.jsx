import * as React from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom'

import Layout from './Pages/Layout'

import Home from './Pages/Home'
import NewTransaction from './Pages/NewTransaction'
import ViewTransactions from './Pages/ViewTransactions'
import IncomeStatement from './Pages/IncomeStatement'


/**
 * React App entry point, builds routes
 */
export default function App() {

    return (
        <MemoryRouter>
            <Routes>
            <Route path='/' element={<Layout />}>
                <Route index element={<Home />} />
                <Route path='new' element={<NewTransaction />} />
                <Route path='view' element={<ViewTransactions />} />
                <Route path='incstmt' element={<IncomeStatement />} />
            </Route>
            </Routes>
        </MemoryRouter>
    )
}