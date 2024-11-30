import * as React from 'react' 

import { Nav, NavDropdown } from "react-bootstrap"
import { Link } from "react-router-dom"

export default function MainNavbarItem({title, links}) {
    
    return (
        <NavDropdown 
            title={title} 
            id={`nav-dropdown-${title}`}>
                {links.map(link =>          
                    <Nav.Link key={link.path} as={Link} to={link.path}>
                        {link.title}
                    </Nav.Link>
                )}
        </NavDropdown>
    )
}