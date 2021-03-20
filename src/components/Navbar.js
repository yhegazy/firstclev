import React from 'react'
import { NavLink } from 'react-router-dom'
import {Navbar, Nav, Form} from 'react-bootstrap'



const NavMenu = () => {
    const [isOpen, setIsOpen] = React.useState(false)

    const toggle = () => {
        setIsOpen(!isOpen)
    }

    return (
        <header>
            <Navbar 
                className="navbar fixed-top navbar-dark mbr-white bg-dark" 
                expand={'sm'}
                onClick={() => toggle()}
                aria-controls="basic-navbar-nav"
                aria-expanded={isOpen}
            >
             
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" in={isOpen}>
                <NavLink className="navbar-brand mr-auto pl-2" to="/">The First Cleveland Mosque</NavLink>
                    
                    <Nav className="mx-5">
                        
                        <NavLink className="nav-link" to="/salah">Prayer Times</NavLink>
                        <NavLink className="nav-link" to="/archives">YouTube Archives</NavLink>
                        <NavLink className="nav-link" to="/annoucements">Annoucements</NavLink>
                        <NavLink className="nav-link" to="/about">About Us</NavLink>
                        <NavLink className="nav-link" to="/covid">COVID-19</NavLink>
                    </Nav>
            </Navbar.Collapse>
        </Navbar>
    </header>
    )
}

export default NavMenu;