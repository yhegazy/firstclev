import {useState} from 'react'
import { Link } from 'react-router-dom'

const NavMenu = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => {
        setIsOpen(!isOpen)
    }

    return <>
        <nav 
            className="navbar" 
            expand={'sm'}
            onClick={() => toggle()}
            aria-controls="basic-navbar-nav"
            aria-expanded={isOpen}
        >
            
            <div aria-controls="basic-navbar-nav" />
            <div id="basic-navbar-nav" in={isOpen}>
            <Link className="navbar-brand mr-auto pl-2" to="/">The First Cleveland Mosque</Link>
                
                <div className="mx-5">
                    
                    <Link className="nav-link" to="/salah">Prayer Times</Link>
                    <Link className="nav-link" to="/archives">YouTube Archives</Link>
                    <Link className="nav-link" to="/annoucements">Annoucements</Link>
                    <Link className="nav-link" to="/about">About Us</Link>
                    <Link className="nav-link" to="/covid">COVID-19</Link>
                </div>
        </div>
    </nav>
    </>
}

export default NavMenu;