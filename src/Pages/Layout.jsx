import * as React from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function Layout () {
    return (<>
    <h1>THIS IS THE LAYOUT</h1>
    <h3>
  Fancy display heading
  <small className="text-body-secondary">With faded secondary text</small>
</h3>
    <ul>
        <li><Link to='/'>HOME</Link></li>
        <li><Link to='/test'>TEST</Link></li>
        </ul>
        <Outlet />
    </>)
}