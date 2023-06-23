import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { account, db, storage } from '../appwrite/appwriteConfig'
import {v4 as uuidv4} from 'uuid' //to auto-generate unique ids

const TABS = "bg-white hover:bg-gray-100 inline-block border-l border-t border-r rounded-t py-2 px-4 text-red-700 font-semibold shadow"
const API_KEY = 'AIzaSyD_Ldqg5txrqvQYnRthvpKfkpbGWhLxa0A'


const Edit = (props) => {
    const navigate = useNavigate();
    const {global} = props
    const [save, setSave] = useState({vID:"", subMenu:"", title: "", body:"", email:"noreply@firstcleveland.org", telephone:"216-404-8635", 
    hrefURL:"firstCleveland.org", start: new Date(), end: new Date(), allDay: false, imageName:"", orderBy: 'date', results: 30, buttonName: "Watch Latest Live Stream (Fridays 1:30p ET)", liveBtnOverride: false }) 
    const [galleryImage, setGalleryImage] = useState(null);
    
    
    const handleLogin = () => {navigate('/admin')}
    const handleLogout = async() => {
        try {
            await account.deleteSession('current')
            navigate('/')   
        } catch (error) {
            console.log(error)
        }
    }

    const handleCheckboxOutcome = (e) => {
        if(save.subMenu === 'Events'){
            if (e.target.value === 'Yes') setSave({...save, allDay: true})
            else setSave({...save, allDay: false})
        }

        if(save.subMenu === 'Settings') {
            if (e.target.value === 'Yes') setSave({...save, liveBtnOverride: true})
            else (setSave({...save, liveBtnOverride: false}))
        }
    }

    //need to set async as separate function or else we get "destroy is not a function" error
    useEffect(() => {
        const fetchYoutubeAPI = async() => {
            fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCYYBYUfJwI3YjmQt_qigTmQ&maxResults=${save.results}&order=${save.orderBy}&key=${API_KEY}`)
                .then((result) => {return result.json()})
                .then((data) => {
                    setSave({...save, id: data.items.map((item) => item.id['videoId']), title: data.items.map((item) => item.snippet['title'])
                })})
                .catch((error) => console.log(error))
        } 
        
        fetchYoutubeAPI()

        return () => {console.info("This will be logged at unmount.")}
    
    }, []); 

    //Remove image from gallery
    const handleRemoveButton = (id) => {
        if(id === 1) setGalleryImage(null)
        // else if (id === 2) setMPCaraousel(null) //Caraousel.remove
    }

    

    const handleSaveButton = async() => {     
        if(save.subMenu === 'Archives') await db.updateDocument("firstClevelandMasjidDB","youtube-api-link", '63a0c5d9a54a5c33c046', 
            {vID: save.vID, orderBy: save.orderBy, results: save.results, id: save.id, title: save.title})

        else if(save.subMenu === 'Gallery') {
            if(galleryImage){
                await storage.createFile('images', galleryImage.name, galleryImage)
                await db.createDocument("firstClevelandMasjidDB","gallery", uuidv4(), {imageName: galleryImage.name, submenu: "gallery"})
            }
        }
       
        else if (save.subMenu === 'Events') await db.createDocument("firstClevelandMasjidDB","upcomingEvents", uuidv4(), 
            {subMenu: save.subMenu, start: save.start, end: save.end, title: save.title, allDay: save.allDay})

        else if (save.subMenu === 'Settings') await db.updateDocument("firstClevelandMasjidDB","settings", "override", 
        {liveBtnOverride: save.liveBtnOverride, buttonName: save.buttonName})

        alert('Updated!')

        setSave({vID:"", subMenu:"", title: "", body:"", email:"noreply@firstcleveland.org", telephone:"216-404-8635", 
            hrefURL:"firstCleveland.org", start: "", end: "", allDay: false})
        setGalleryImage(null)
    } 

    const handleEmailButton = () => {
        fetch('/email', {method: "POST",})
            .then(function(res){ console.log(res) })
    }

    const handleSMSButton = () => {
        fetch('/sms', {method: "POST"})
            .then(function(res){console.log(res)})
    }

    const handleSMSDDL = (e) => {
        e.value !== 'select' && fetch('/ddl', {
            method: "POST", 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({option: e.value})
        })
        .then(function(res){console.log(res)})
    }

    const handleGetImage = (e) => {setGalleryImage(e.target.files[0])}

    return <>
        <div className="sm:w-3/4 sm:px-2 sm:py-5 my-10 sm:ml-auto sm:mr-auto space-x-3 sm:space-x-0 pt-24 ">
            <div className="flex flex-wrap">
                <div className="ml-auto mr-auto ">
                    {global.loggedIn && 
                        <div className="flex justify-center py-4"><button className="px-4 py-2 font-semibold text-white 
                        bg-yellow-500 rounded shadow hover:bg-yellow-700" onClick={handleLogout}>Logout</button></div>}
                    {/* Header Menu */}
                    <div className="m-2 flex sm:flex-wrap justify-around">
                        <button key="yt" onClick={e => setSave({...save, subMenu: e.currentTarget.name})} className={TABS} name="Archives">Archives</button>
                        
                        <button key="ga" onClick={e => setSave({...save, subMenu: e.currentTarget.name})} className={TABS} name="Gallery">Gallery</button>
                        
                        <button key="cal" onClick={e => setSave({...save, subMenu: e.currentTarget.name})} className={TABS} name="Events">Upcoming Events</button>

                        <button key="set" onClick={e => setSave({...save, subMenu: e.currentTarget.name})} className={TABS} name="Settings">Settings</button>
                        
                    </div>
                </div>
            </div>

            { global.loggedIn ? 
                // Archives UI Console
                save.subMenu === 'Archives' ? 
                [<div className="flex sm:justify-center justify-between p-4">
                    <label className="sm:px-2 font-semibold" htmlFor="archive" >YouTube URL : </label>
                    <input className="border border-black" id="youtube" onChange={e => setSave({...save, vID: e.target.value})} />
                </div>,
                <div className="flex sm:justify-center justify-between p-4">
                    <button className="px-4 py-2 font-semibold text-white bg-blue-500 rounded shadow hover:bg-blue-700" onClick={handleSaveButton}>
                        Update!
                    </button>
                </div> ]

                //Gallery UI Console
                : save.subMenu === 'Gallery' ? [<div className=" flex flex-wrap justify-evenly py-4">
                    <input type="file" onChange={handleGetImage} />
                    <br />
                    <button className="px-4 py-2 font-semibold text-white bg-red-500 rounded shadow hover:bg-red-700" onClick={()=> handleRemoveButton(1)}>Remove</button>
                    <button className="p-2 font-semibold text-white bg-blue-500 rounded shadow hover:bg-blue-700" onClick={handleSaveButton}>Add to Gallery</button>
                </div>,   
                ]

                // Events UI Console
                : save.subMenu === 'Events' ?  
                    [<div className="flex justify-center py-4">
                        <label className="px-2 font-semibold" htmlFor="title" >Title: </label>
                        <input className="border border-black" id="title" type="text" size="20" 
                            onChange={e => setSave({...save, title: e.target.value})} />
                    </div>,
                    <div className="flex justify-center py-4">
                        <label className="px-2 font-semibold" htmlFor="start" >Start Date: </label>
                        <input className="border border-black" id="start" type="datetime-local" 
                            onChange={e => setSave({...save, start: e.target.value})} />
                    </div>,
                    <div className="flex justify-center py-4">
                        <label className="px-2 font-semibold" htmlFor="end" >End Date: </label>
                        <input className="border border-black" id="end" type="datetime-local" 
                            onChange={e => setSave({...save, end: e.target.value})} />
                    </div>,
                    <div className="flex justify-center py-4">
                        <label className="px-2 font-semibold" htmlFor="start" >All Day Event? </label>
                        <select onChange={e => handleCheckboxOutcome(e)} >
                            <option>No</option>
                            <option>Yes</option>
                        </select>
                    </div>,
                    <div className="flex justify-center py-4">
                        <button className="px-4 py-2 font-semibold text-white bg-blue-500 rounded shadow hover:bg-blue-700" 
                            onClick={handleSaveButton}>Save!</button>
                    </div> 
                
                ]

                // Settings UI Console
                : save.subMenu === 'Settings' ?
                    [<div className="grid justify-center py-4">
                        <label className="px-2 font-semibold" htmlFor="liveBtnOverride" >Override Live Stream Button text? </label>
                        <select className=' border border-black' onChange={e => handleCheckboxOutcome(e)} >
                            <option>No</option>
                            <option>Yes</option>
                        </select>
                    </div>,
                    // Is Override enabled? yes, show...no, hide.
                    save.liveBtnOverride && [<div className="grid justify-center py-4">
                        <label className="px-2 font-semibold" htmlFor="welcome" >Change To: </label>
                        <input className="border border-black" id="welcome" type="text" size="20" 
                            onChange={e => setSave({...save, buttonName: e.target.value})} />
                    </div>,
                
                    <div className="grid justify-center py-4">
                        <button className="px-4 py-2 font-semibold text-white bg-blue-500 rounded shadow hover:bg-blue-700" 
                            onClick={handleSaveButton}>Save!</button>
                    </div> ],

                    <div className="py-4 grid justify-center">
                        <label className="px-2 font-semibold" htmlFor="liveBtnOverride" >Send Email to subscribers?</label>
                        <button className="px-4 py-2 font-semibold text-white bg-blue-500 rounded shadow hover:bg-blue-700" onClick={handleEmailButton}>Submit</button>
                    </div>,

                    <div className="py-4 grid justify-center">
                        <label className="px-2 font-semibold" htmlFor="liveBtnOverride" >Send SMS to subscribers?</label>
                        <select className=' border border-black' onChange={e => handleSMSDDL(e.target)} >
                            <option>select</option>
                            <option>liveStream</option>
                            <option>eid</option>
                            <option>test</option>
                        </select>    
                    </div>,
                    <div className="py-4 grid justify-center">
                        <label className="px-2 font-semibold" htmlFor="liveBtnOverride" >Send SMS to subscribers?</label>
                        <button className="px-4 py-2 font-semibold text-white bg-green-500 rounded shadow hover:bg-green-700" onClick={handleSMSButton}>Submit</button>
                    </div>

                    ]
                : <div className="flex justify-center py-4"><p>Select an option to edit thy page</p></div> 
            : 
               [ <div className="flex justify-center py-4"><p>Login Access Required</p></div>,
                 <div className="flex justify-center py-4"><button className="px-4 py-2 font-semibold text-white bg-yellow-500 rounded shadow 
                    hover:bg-yellow-700" onClick={handleLogin}>Log on</button></div>]
            
            }

                          
        </div>
    </>
}

export default Edit