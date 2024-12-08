import * as React from 'react';
import { Route, Routes } from 'react-router-dom'

// Main layout
import Layout from './Pages/Layout'

import Home from './Pages/Home'
import NewTransaction from './Pages/NewTransaction'
import ViewTransactions from './Pages/ViewTransactions'
import IncomeStatement from './Pages/IncomeStatement'

export default function AppRoutes() {
    return (
        <Routes>
        <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='new' element={<NewTransaction />} />
            <Route path='view' element={<ViewTransactions />} />
            <Route path='incstmt' element={<IncomeStatement />} />
        </Route>
        </Routes>
    )
    
}