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
                <a href="/"><img key="logo194" src={process.env.PUBLIC_URL + `/logo194.png`} className="p-4 " alt="Welcome"/> </a>
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
            {!nav ?  <i className="fa-solid fa-bars"></i> :  <i className="fa-solid fa-x"></i>}
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
                <ul className="flex ">
                    <li >
                        <a 
                            href="https://www.facebook.com/groups/274133077054225" 
                            target="_blank"
                            rel="noreferrer"
                            className="flex justify-center items-center p-2">
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 48 48">
                                <path fill="#039be5" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"></path><path fill="#fff" d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"></path>
                            </svg>
                        </a>
                    </li>
                    <li >
                        <a 
                            href="https://youtube.com/channel/UCYYBYUfJwI3YjmQt_qigTmQ" 
                            target="_blank"
                            rel="noreferrer"
                            className="flex justify-center items-center p-2">
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 48 48">
                                <path fill="#FF3D00" d="M43.2,33.9c-0.4,2.1-2.1,3.7-4.2,4c-3.3,0.5-8.8,1.1-15,1.1c-6.1,0-11.6-0.6-15-1.1c-2.1-0.3-3.8-1.9-4.2-4C4.4,31.6,4,28.2,4,24c0-4.2,0.4-7.6,0.8-9.9c0.4-2.1,2.1-3.7,4.2-4C12.3,9.6,17.8,9,24,9c6.2,0,11.6,0.6,15,1.1c2.1,0.3,3.8,1.9,4.2,4c0.4,2.3,0.9,5.7,0.9,9.9C44,28.2,43.6,31.6,43.2,33.9z"></path><path fill="#FFF" d="M20 31L20 17 32 24z"></path>
                            </svg>
                        </a>
                    </li>
                    <li >
                        <a 
                            href="https://www.tiktok.com/@first.cleveland" 
                            target="_blank"
                            rel="noreferrer"
                            className="flex justify-center items-center p-2">
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 48 48">
                                <path fill="#212121" fill-rule="evenodd" d="M10.904,6h26.191C39.804,6,42,8.196,42,10.904v26.191 C42,39.804,39.804,42,37.096,42H10.904C8.196,42,6,39.804,6,37.096V10.904C6,8.196,8.196,6,10.904,6z" clip-rule="evenodd"></path><path fill="#ec407a" fill-rule="evenodd" d="M29.208,20.607c1.576,1.126,3.507,1.788,5.592,1.788v-4.011 c-0.395,0-0.788-0.041-1.174-0.123v3.157c-2.085,0-4.015-0.663-5.592-1.788v8.184c0,4.094-3.321,7.413-7.417,7.413 c-1.528,0-2.949-0.462-4.129-1.254c1.347,1.376,3.225,2.23,5.303,2.23c4.096,0,7.417-3.319,7.417-7.413L29.208,20.607L29.208,20.607 z M30.657,16.561c-0.805-0.879-1.334-2.016-1.449-3.273v-0.516h-1.113C28.375,14.369,29.331,15.734,30.657,16.561L30.657,16.561z M19.079,30.832c-0.45-0.59-0.693-1.311-0.692-2.053c0-1.873,1.519-3.391,3.393-3.391c0.349,0,0.696,0.053,1.029,0.159v-4.1 c-0.389-0.053-0.781-0.076-1.174-0.068v3.191c-0.333-0.106-0.68-0.159-1.03-0.159c-1.874,0-3.393,1.518-3.393,3.391 C17.213,29.127,17.972,30.274,19.079,30.832z" clip-rule="evenodd"></path><path fill="#fff" fill-rule="evenodd" d="M28.034,19.63c1.576,1.126,3.507,1.788,5.592,1.788v-3.157 c-1.164-0.248-2.194-0.856-2.969-1.701c-1.326-0.827-2.281-2.191-2.561-3.788h-2.923v16.018c-0.007,1.867-1.523,3.379-3.393,3.379 c-1.102,0-2.081-0.525-2.701-1.338c-1.107-0.558-1.866-1.705-1.866-3.029c0-1.873,1.519-3.391,3.393-3.391 c0.359,0,0.705,0.056,1.03,0.159V21.38c-4.024,0.083-7.26,3.369-7.26,7.411c0,2.018,0.806,3.847,2.114,5.183 c1.18,0.792,2.601,1.254,4.129,1.254c4.096,0,7.417-3.319,7.417-7.413L28.034,19.63L28.034,19.63z" clip-rule="evenodd"></path><path fill="#81d4fa" fill-rule="evenodd" d="M33.626,18.262v-0.854c-1.05,0.002-2.078-0.292-2.969-0.848 C31.445,17.423,32.483,18.018,33.626,18.262z M28.095,12.772c-0.027-0.153-0.047-0.306-0.061-0.461v-0.516h-4.036v16.019 c-0.006,1.867-1.523,3.379-3.393,3.379c-0.549,0-1.067-0.13-1.526-0.362c0.62,0.813,1.599,1.338,2.701,1.338 c1.87,0,3.386-1.512,3.393-3.379V12.772H28.095z M21.635,21.38v-0.909c-0.337-0.046-0.677-0.069-1.018-0.069 c-4.097,0-7.417,3.319-7.417,7.413c0,2.567,1.305,4.829,3.288,6.159c-1.308-1.336-2.114-3.165-2.114-5.183 C14.374,24.749,17.611,21.463,21.635,21.38z" clip-rule="evenodd"></path>
                            </svg>
                        </a>
                    </li>
                    <li >
                        <a 
                            href="https://rumble.com/c/c-4990175" 
                            target="_blank"
                            rel="noreferrer"
                            className="flex justify-center items-center p-2">
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 48 48">
                                <path fill="#8bc34a" d="M38.544,16.899C34.578,13.008,23.053,5,16,5c-3,0-6,1-8,6S6,24,6,24s0,8,2,13s5,6,8,6	c7.053,0,18.578-8.008,22.544-11.899C40.204,29.473,42,27.422,42,24C42,20.578,40.204,18.527,38.544,16.899z"></path><path fill="#fff" d="M16.472,19.839c-0.296,2.881-0.296,5.441,0,8.322c0.209,2.031,2.321,3.298,4.187,2.469	c1.979-0.879,4.578-2.234,7.324-4.22c1.629-1.178,1.629-3.642,0-4.82c-2.746-1.986-5.345-3.342-7.324-4.22	C18.793,16.541,16.681,17.808,16.472,19.839z"></path>
                            </svg>
                        </a>
                    </li>
                    <li >
                        <a 
                            href="https://www.instagram.com/firstclevelandmasjid/" 
                            target="_blank"
                            rel="noreferrer"
                            className="flex justify-center items-center p-2">
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 48 48">
                                <path fill="#7238ce" d="M41.28,12.28c-0.4-0.43-4.476-0.606-5.28-1.28c-1.14-0.955-0.622-3.939-1.83-4.76	C37.42,6.96,40.07,9.25,41.28,12.28z"></path><path fill="#8638c6" d="M41.28,15.64L42,17v1.26c-1.26-1.71-10.459-9.858-14.289-11.668L29.7,6H32	c0.75,0,1.47,0.08,2.17,0.24c2.06,1.4,4.03,2.99,5.88,4.79c0.42,0.41,0.83,0.82,1.23,1.25c0.225,0.55,0.399,1.126,0.52,1.72	C41.8,14,41.28,14.957,41.28,15.64z"></path><path fill="#a035bf" d="M42,18.26v6.1C40.351,21.326,24.095,7.862,16.802,6.109c-0.183-0.044-0.285,0.03-0.456,0.001L16.7,6	h9.52l1.037,0.509c1.298,0.613,2.441,0.792,3.678,1.555c2.413,1.489,4.7,3.263,6.815,5.326C39.32,14.92,40.74,16.55,42,18.26z"></path><path fill="#be37b5" d="M42,24.36c0,0-0.02,8.69-0.05,8.64C40.46,27.51,9.3,8.79,9.06,8.81	c1.204-1.164,2.695-2.029,4.359-2.473C13.419,6.337,15.107,7,16,7c0,0,0.589-0.945,0.749-0.916	c6.827,1.245,13.366,4.457,18.711,9.656C38.13,18.34,40.31,21.25,42,24.36z"></path><path fill="#df35a5" d="M41.95,33c-0.2,2.06-1.03,3.93-2.3,5.43c-0.72-6.59-31.9-26.28-32.93-26.16	c0.53-1.32,1.33-2.5,2.34-3.46C9.3,8.79,9.54,8.78,9.78,8.78c8.41-0.11,16.87,2.98,23.38,9.32C37.53,22.35,40.46,27.51,41.95,33z"></path><path fill="#fb3593" d="M39.65,38.43v0.01c-0.87,1.03-1.93,1.87-3.14,2.48c-0.17-6.6-27.828-25.531-29.107-25.321	C7.417,15.019,6.089,14.552,6.2,14c0.121-0.599,0.296-1.178,0.52-1.73c1.03-0.12,2.06-0.19,3.1-0.2c7.58-0.1,15.19,2.68,21.05,8.39	C36,25.45,38.93,31.84,39.65,38.43z"></path><path fill="#ff3a71" d="M33.24,41.92c0,0-25.95-23.12-27.24-22.88V17l0.876-1.319c1.28-0.21,1.704-0.301,2.994-0.321	c6.73-0.09,13.5,2.39,18.7,7.45c5.11,4.97,7.77,11.51,7.94,18.11C35.51,41.43,34.41,41.78,33.24,41.92z"></path><path fill="#ff3f43" d="M33.24,41.36v0.56C32.84,41.97,32.42,42,32,42h-2.06C29.95,41.8,7.3,22.11,6,22.39v-3.35	c1.29-0.24,2.6-0.37,3.91-0.39c5.89-0.08,11.81,2.09,16.37,6.52C30.84,29.61,33.16,35.47,33.24,41.36z"></path><path fill="#fe4c2b" d="M29.95,41.4c0,0.2,0,0.4-0.01,0.6h-3.29c0.01-0.19-1.283-0.646-1.283-0.826	C25.317,36.964,11.4,24.34,6,25.77v-3.38c1.3-0.28,2.63-0.43,3.95-0.45c5.05-0.07,10.13,1.79,14.04,5.59	C27.89,31.33,29.89,36.35,29.95,41.4z"></path><path fill="#ff5a17" d="M26.66,41.45c0,0.18,0,0.36-0.01,0.55h-3.28c0.01-0.17-1.156-0.982-1.156-1.152	C22.164,37.488,10.53,27.68,6,29.2v-3.43c5.4-1.43,11.39-0.07,15.69,4.11C24.95,33.05,26.61,37.24,26.66,41.45z"></path><path fill="#ff6804" d="M23.38,41.49c0,0.17,0,0.34-0.01,0.51h-3.29c0.09-2.68-10.44-10.96-14.05-9.26	C6.02,32.74,6,29.2,6,29.2c4.53-1.52,9.74-0.53,13.4,3.04C22,34.78,23.33,38.13,23.38,41.49z"></path><path fill="#ff7501" d="M16.78,42c0.1-1.82-7.44-7.47-9.93-5.97c-0.45-1.02-0.74-2.12-0.82-3.29	c3.61-1.7,8.05-1.09,11.07,1.86c2.08,2.02,3.07,4.72,2.98,7.4H16.78z"></path><path fill="#ff8c01" d="M16.78,42H16c-0.86,0-1.69-0.11-2.49-0.32c0-0.86-3.62-3.57-4.85-2.9c-0.75-0.8-1.36-1.73-1.81-2.75	c2.49-1.5,5.78-1.2,7.96,0.93C16.22,38.33,16.88,40.18,16.78,42z"></path><path fill="#ff9b04" d="M13.51,41.68c-1.89-0.48-3.57-1.5-4.85-2.9c1.23-0.67,2.8-0.49,3.85,0.53	C13.18,39.96,13.51,40.82,13.51,41.68z"></path><path fill="#fff" d="M42,16v1H6v-1c0-0.69,0.07-1.36,0.2-2h11.69l-4.47-7.66C14.24,6.12,15.11,6,16,6h0.7l4.66,8h9.53	l-4.67-8h3.48l4.66,8h7.44C41.93,14.64,42,15.31,42,16z"></path><path fill="#fff" d="M18,33.114v-9.228c0-1.539,1.666-2.502,2.999-1.732l7.998,4.614c1.334,0.77,1.334,2.695,0,3.465	l-7.998,4.614C19.666,35.616,18,34.653,18,33.114z"></path>
                            </svg>
                        </a>
                    </li>
                </ul>

                {/* <ul>
                    <li className="w-[120px] h-[40px]  bg-gradient-to-br from-blue-800 from-5% via-red-500 via-55% to-yellow-500 to-95% text-white hover:text-slate-300 font-semibold">
                        <a 
                            href="https://www.instagram.com/firstclevelandmasjid/" 
                            target="_blank"
                            rel="noreferrer"
                            className="flex justify-center items-center p-2">
                                Instagram
                        </a>
                    </li>
                </ul> */}
            </div>

        </div>      

        
    </>
}

export default Navbar

