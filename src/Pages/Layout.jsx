import * as React from 'react';
import { Button } from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';

export default function Layout () {
    
    return (<>
    <h1>ECONOMAU</h1>
        <Outlet />
    </>)
}