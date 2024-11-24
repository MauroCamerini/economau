import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import MainNavbar from '../UI/MainNavbar';


export default function Layout () {
    
    return (<>
        <MainNavbar />
        <Container className="container-lg mt-4" >
            <Outlet />
        </Container>
    </>)
}