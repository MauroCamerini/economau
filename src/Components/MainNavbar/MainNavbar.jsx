import * as React from 'react' 

import { Container, Navbar, Nav } from "react-bootstrap";
import { mainNavbarConfig } from "../../UI/ui.config";
import MainNavbarItem from './MainNavbarItem';

export default function MainNavbar(params) {
    
    return (
        <Navbar expand="lg">
            <Container>
                <Nav className="me-auto" >
                    {mainNavbarConfig.map((item) => <MainNavbarItem key={item.title} title={item.title} links={item.children} />)}
                </Nav>
            </Container>
        </Navbar>
    )
}