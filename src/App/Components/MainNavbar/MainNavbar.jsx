import * as React from 'react' 

import { Container, Navbar, Nav } from "react-bootstrap";
import { mainNavbarConfig } from "../../config";
import MainNavbarItem from './MainNavbarItem';

export default function MainNavbar(params) {
    
    return (
        <Navbar>
            <Container>
                <Navbar.Collapse>
                <Nav className="me-auto" >
                    {mainNavbarConfig.map((item) => <MainNavbarItem key={item.title} title={item.title} links={item.children} />)}
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}