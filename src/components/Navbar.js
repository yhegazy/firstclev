import React from 'react'
import { NavLink } from 'react-router-dom'
import {Navbar, Nav, Form} from 'react-bootstrap'



const NavMenu = () => {
    // const [isOpen, setIsOpen] = React.useState(false)


    return (
        <header>
            <Navbar className="navbar fixed-top navbar-expand-md navbar-dark bg-dark" expand="lg">
                <NavLink className="navbar-brand mx-auto" to="/">The First Cleveland Mosque</NavLink>
            
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
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