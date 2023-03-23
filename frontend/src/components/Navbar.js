import {Link} from 'react-router-dom'
import {useState} from 'react'

const menuItems = [
    {
        id: 1,
        title: 'Home',
        exact: true,
        to: '/',        
        icon: 'fa-solid fa-home'
    },
    {
        id: 2,
        title: 'Salah',
        to: '/salah',
        icon: 'fa-solid fa-person-praying',
    },
    {
        id: 3,
        title: 'Archives',
        exact: true,
        to: '/archives',
        icon: "fa-brands fa-youtube",
    },
    {
        id: 4,
        title: 'Upcoming Events',
        exact: true,
        to: '/events',
        icon: 'fa-regular fa-calendar',
    },
    {
        id: 5,
        title: 'About',
        exact: true,
        to: '#',
        subMenus: [
        { title: "About Us", to: "/about" },
        // { title: "Mission Statement", to: "/message" },
        { title: "Contact Us", to: "/contact"},
        ],
        icon: 'fa-solid fa-circle-info',
    },
    {
        id: 6,
        title: 'Gallery',
        exact: true,
        to: '/gallery',
        icon: "fa-regular fa-at",
    },
    // {
    //     id: 7,
    //     title: 'Dawah Alliance',
    //     exact: true,
    //     to: '/dawah',
    // },

    // {
    //     id: 4,
    //     title: 'Service',
    //     exact: true,
    //     to: '#',
    //     subMenus: [
    //     { title: "Funeral Information", to: "/funeral" },
    //     { title: "Marriage Ceremonies", to: "/marriage",},
    //     { title: "Family Counseling", to: "/family",},
    //     { title: "Divorce Counseling", to: "/divorce",},
    //     { title: "Dawah Program", to: "/dawah",},
    //     ],
    //     icon: 'fa-regular fa-calendar',
    // },
    // {
    //     id: 5,
    //     title: 'Classes',
    //     exact: true,
    //     to: '/classes',
    // },
    
    
];

const Navbar = (props) => {
    const {global} = props
    const [subToggle, setSubToggle] = useState(-1)
    const [toggle, setToggle] = useState(false)

    const handleSubToggle = (id) => {
        if(id === subToggle) setSubToggle(-1)
        else setSubToggle(id)
    }

    return <>
        <nav className="sm:flex sm:justify-evenly sm:pb-1 sm:pt-2 sm:static fixed sm:bg-transparent bg-white w-full ">
            <img src={process.env.PUBLIC_URL + `/logo194.png`} className="w-12" alt="Welcome"/> 
            <ul className="xl:space-x-5 xl:space-x-0 space-x-3 px-1">
                 
                {menuItems.map((item) => {
                    return <>
                        <Link to={item.to}>
                            <li key={item.id} onClick={() => handleSubToggle(item.id)} className={item.subMenus && 'text-center'}>
                                <p className="text-lg"> {item.title}{item.subMenus && <span>&#9662;</span> } </p>
                                <ul className="bg-gray-200 shadow-2xl dropdown rounded-2xl">
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

