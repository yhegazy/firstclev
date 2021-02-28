import React from 'react'
import { NavLink } from 'react-router-dom'



const NavMenu = () => {
    // const [isOpen, setIsOpen] = React.useState(false)


    return (
        <header>
        <nav className="navbar fixed-top navbar-expand-md navbar-dark bg-dark">
        <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <NavLink className="nav-link" to="/salah">Prayer Times</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/archives">YouTube Archives</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/annoucements">Annoucements</NavLink>
                </li>
            </ul>
        </div>
        <div className="mx-auto order-0">
            <NavLink className="navbar-brand mx-auto" to="/">The First Cleveland Mosque</NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".dual-collapse2">
                <span className="navbar-toggler-icon"></span>
            </button>
        </div>
        <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                <NavLink className="nav-link" to="/about">About Us</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/covid">COVID-19</NavLink>
                </li>
            </ul>
        </div>
    </nav>
    </header>
    )
}

export default NavMenu;