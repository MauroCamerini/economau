import * as React from 'react';
import { Route, Routes } from 'react-router-dom'

// Main layout
import Layout from './Pages/Layout'

import Home from './Pages/Home'
import NewTransaction from './Pages/NewTransaction'
import ViewTransactions from './Pages/ViewTransactions'
import View from './Pages/View';
import ViewByPeriod from './Pages/ViewByPeriod';

export default function AppRoutes() {
    return (
        <Routes>
        <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='new' element={<NewTransaction />} />
            <Route path='transactions' element={<ViewTransactions />} />
            <Route path='view/:table' element={<View />} />
            <Route path='byperiod/:table' element={<ViewByPeriod />} />
        </Route>
        </Routes>
    )
    
}