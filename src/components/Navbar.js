import {Link} from 'react-router-dom'
import {useState} from 'react'

const menuItems = [
    {
        id: 1,
        title: 'Home',
        exact: true,
        to: '/',        
    },
    {
        id: 2,
        title: 'Salah',
        to: '/salah',
    },
    {
        id: 3,
        title: 'Archives',
        exact: true,
        to: '/archives',
    },
    {
        id: 4,
        title: 'Service',
        exact: true,
        to: '#',
        subMenus: [
        { title: "Funeral Information", to: "/funeral" },
        { title: "Marriage Ceremonies", to: "/marriage",},
        { title: "Family Counseling", to: "/family",},
        { title: "Divorce Counseling", to: "/divorce",},
        { title: "Dawah Program", to: "/dawah",},
        ]
    },
    {
        id: 5,
        title: 'Classes',
        exact: true,
        to: '/classes',
    },
    {
        id: 6,
        title: 'Announcements',
        exact: true,
        to: '/announcements',
    },
    {
        id: 7,
        title: 'Upcoming Events',
        exact: true,
        to: '/events',
    },
    {
        id: 8,
        title: 'About',
        exact: true,
        to: '#',
        subMenus: [
        { title: "About Us", to: "/about" },
        { title: "Message from the Imam", to: "/message" },
        { title: "Contact Us", to: "/contact",},
        ],
    },
    {
        id: 9,
        title: 'CEC',
        exact: true,
        to: '/cec',
    },
    
];

const Navbar = (props) => {
    const {global} = props
    const [subToggle, setSubToggle] = useState(-1)

    const handleSubToggle = (id) => {
        if(id === subToggle) setSubToggle(-1)
        else setSubToggle(id)
    }

    return <>
        <nav className={`flex justify-evenly pb-1 pt-2 `}>
            <img src={process.env.PUBLIC_URL + `/logo194.png`} className="w-12" alt="Welcome"/>
            <ul className="space-x-5">
                 
                {menuItems.map((item) => {
                    return <>
                        <Link to={item.to}>
                            <li key={item.id} onClick={() => handleSubToggle(item.id)} className={item.subMenus && 'text-center'}>
                                <p className={`text-lg ${global.darkMode ? 'text-white': 'text-black'}`}> {item.title}{item.subMenus && <span>&#9662;</span> } </p>
                                <ul className="dropdown bg-gray-200">
                                    {item.subMenus && item.subMenus.map((subItem, index) => subToggle === item.id && 
                                        <li key={index} className={` ${global.darkMode ? 'text-white': 'text-black'}`}>
                                           <Link to={subItem.to} className="min-w-max">{subItem.title}
                                           </Link>
                                        </li> 
                                    
                                    )}
                                </ul>
                            </li>
                        </Link>
                    </> 
                })}
            </ul>
        </nav>
    </>
}

export default Navbar