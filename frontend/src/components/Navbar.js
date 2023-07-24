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
        title: 'Calendar',
        exact: true,
        to: '/events',
        icon: 'fa-regular fa-calendar',
    },
    {
        id: 5,
        title: 'About',
        exact: true,
        to: '/about',
    },
    {
        id: 6,
        title: 'Contact',
        exact: true,
        to: '/contact'
    },
    {
        id: 7,
        title: 'Gallery',
        exact: true,
        to: '/gallery',
        icon: "fa-regular fa-at",
    },
    // {
    //     id: 7,
    //     title: 'Resources',
    //     exact: true,
    //     to: '/resources',
    //     subMenus: [
    //         { title: "Where to Pray", to: "/masajid" },
    //         { title: "Newsletters", to: "/newsletters" },
    //     ]
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
    const {onNavClick, nav} = props

  

    return <>
        <div className={`sticky w-full h-[120px] flex justify-between items-center shadow-inner `}>
            <div>
                <img key="logo194" src={process.env.PUBLIC_URL + `/logo194.png`} className="p-4 " alt="Welcome"/> 
            </div>

            {/* Desktop */}
            {<ul className={`hidden md:flex space-x-5 px-4 `}>
                {menuItems.map((item) =>
                    <li key={item.id}>
                        <a href={item.to}>
                        <div>
                            <h2 className="text-lg font-semibold sm:text-xl">
                                {item.title}
                            </h2>
                        </div>
                    </a>
                </li>)}
            </ul>}
            
            {/* Hamburger Menu */}
            <div className={`md:hidden z-10 text-3xl px-4 `} onClick={onNavClick}>
            {!nav ?  <i class="fa-solid fa-bars"></i> :  <i class="fa-solid fa-x"></i>}
            </div>

            {/* Mobile */}
            <ul className={!nav ? "hidden" : `absolute top-0  left-0 w-full h-screen flex flex-col justify-center items-center bg-white`} >
                {menuItems.map((item) =>
                    <li onClick={onNavClick} key={item.id} >
                        <a href={item.to}>
                        <div className="hover:underline hover:italic">
                            <h2 className="font-semibold text-3xl py-3">
                                {/* <i className={` ${item.icon} `} ></i> */}
                                {item.title}
                            </h2>
                        </div>
                    </a>
                </li>)}
            </ul>

            {/* Social Media */}
            <div className=" flex-col top-[35%] left-0 lg:flex hidden space-y-2 px-2 ">
                <ul className="">
                    <li className="w-[120px] h-[40px] hover:bg-blue-700  bg-blue-500 text-white font-semibold">
                        <a 
                            href="https://www.facebook.com/groups/274133077054225" 
                            target="_blank"
                            rel="noreferrer"
                            className="flex justify-center items-center p-2">
                                Facebook 
                        </a>
                    </li>
                </ul>

                <ul>
                    <li className="w-[120px] h-[40px]  bg-gradient-to-br from-blue-800 from-5% via-red-500 via-55% to-yellow-500 to-95% text-white hover:text-slate-300 font-semibold">
                        <a 
                            href="https://www.instagram.com/firstclevelandmasjid/" 
                            target="_blank"
                            rel="noreferrer"
                            className="flex justify-center items-center p-2">
                                Instagram
                        </a>
                    </li>
                </ul>
            </div>

        </div>      

        
    </>
}

export default Navbar

