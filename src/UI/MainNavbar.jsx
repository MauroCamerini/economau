import * as React from 'react' 

import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { routesConfig } from "./ui.config";

const renderNavLinks = (routes, basePath = "") => 
    routes.filter((route) => route.inNavbar).map(route => {
        const fullPath = `${basePath}/${route.path}`.replace(/\/+/g, "/"); // Asegura que no haya `//`

        if(route.children) {
            return (
                <NavDropdown 
                    key={route.element} 
                    title={route.caption} 
                    id={`nav-dropdown-${route.element}`}>
                        {renderNavLinks(route.children, fullPath)}
                </NavDropdown>
            )
        }

        return (
            <Nav.Link key={route.element} as={Link} to={fullPath}>
                {route.caption}
            </Nav.Link>
        )
    })

export default function MainNavbar(params) {
    
    return (
        <Navbar expand="lg">
            <Container>
                <Nav className="me-auto" >
                    {renderNavLinks(routesConfig)}
                </Nav>
            </Container>
        </Navbar>
    )
}