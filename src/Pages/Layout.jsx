import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import MainNavbar from '../Components/MainNavbar/MainNavbar';


export default function Layout () {
    
    return (<>
        <MainNavbar />
        <Container className="container-lg" >
            <Outlet />
        </Container>
    </>)
}