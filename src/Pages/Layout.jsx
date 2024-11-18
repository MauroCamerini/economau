import * as React from 'react';
import { Button } from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';
import NewTransaction from '../Components/NewTransaction';

export default function Layout () {
    
    return (<>
    <h1>ECONOMAU</h1>
    <div><ul>
        <li><Link to="/">New transaction</Link></li>
        <li><Link to="getall">Get all transactions</Link></li>
    </ul></div>
        <Outlet />
    </>)
}