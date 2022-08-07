import {Link} from 'react-router-dom'

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
        title: 'Salah Times',
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
        title: 'Annoucement',
        exact: true,
        to: '/contact',
        icon: 'fa-regular fa-calendar',
        subMenus: [
        { title: "Classes", to: "/classes" }, 
        { title: "Events", to: "/events" },
        ],
    },
    {
        id: 5,
        title: 'About',
        exact: true,
        to: '/about',
        icon: 'fa-solid fa-circle-info',
    },
    {
        id: 6,
        title: 'Contact Us',
        exact: true,
        to: '/contact',
        icon: "fa-regular fa-at",
    },
];

const Navbar = () => {
    return <>
        <nav className={`sidebar close`}>
            <ul className="menu-items">
                {menuItems.map((item) => 
                    <li key={item.id}>
                        <div className="block">
                            <Link to={item.to}>
                            <p className="flex items-center no-underline">
                                <i className={item.icon} ></i>
                            </p>
                             </Link>
                        </div>
                        
                        <ul className="hidden sub-menu">
                            <Link to={item.to}>
                                <li key={item.id}>
                                   <p className="text-lg text-white transition-all duration-500 ease-linear ">{item.title}</p>
                                </li>
                            </Link>

                            {item.subMenus && item.subMenus.map((subItem, index) => <Link to={subItem.to}>
                                <li id={index} key={index}>
                                    <p className="py-1 text-white transition-all duration-300 ease-linear cursor-pointer whitespace-nowrap hover:opacity-100 hover:text-gray-400">{subItem.title}</p>
                                </li> 
                            </Link>)}
                        </ul>
                    </li>
                )}

            </ul>
        </nav>
    </>
}

export default Navbar