import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { account, db, storage } from '../appwrite/appwriteConfig'
import {v4 as uuidv4} from 'uuid' //to auto-generate unique ids

const TABS = "bg-white hover:bg-gray-100 inline-block border-l border-t border-r rounded-t py-2 px-4 text-red-700 font-semibold shadow"

const Edit = (props) => {
    const navigate = useNavigate();
    const {global} = props
    const [save, setSave] = useState({vID:"", subMenu:"", title: "", body:"", email:"noreply@firstcleveland.org", telephone:"216-404-8635", hrefURL:"firstCleveland.org", start: new Date(), end: new Date(), allDay: false, imageName:""}) 
    const [selectedImage, setSelectedImage] = useState(null);
    
    const handleLogin = () => {navigate('/admin')}
    const handleLogout = async() => {
        try {
            await account.deleteSession('current')
            navigate('/')   
        } catch (error) {
            console.log(error)
        }
    }

    const handleAllDayEvent = (e) => {
        if (e.target.value === 'Yes') setSave({...save, allDay: true})
        else setSave({...save, allDay: false})
    }

    const handleSaveButton = async() => {     
        if(save.subMenu === 'YouTube') await db.updateDocument("637278aa811fb8962b16","637281a5a4ef8b18ff46", '637281cdc2f22d321e13', {vID: save.vID})

        else if(save.subMenu === 'Gallery') {
            if(selectedImage){
                await storage.createFile('6377974dd959ac782a05', selectedImage.name, selectedImage)
                await db.createDocument("637278aa811fb8962b16","637281e5c3afb43718cc", uuidv4(), {imageName: selectedImage.name, submenu: "mainpage"})
            }
        }
            
        else if (save.subMenu === 'Events') await db.createDocument("637278aa811fb8962b16","63727c039087bffba695", uuidv4(), {subMenu: save.subMenu, start: save.start, end: save.end, title: save.title, allDay: save.allDay})
        
        else if (save.subMenu === 'Posts') {
            if(selectedImage) {
                await storage.createFile('6377974dd959ac782a05', selectedImage.name, selectedImage);

                await db.createDocument("637278aa811fb8962b16","637278b17505ad9eea21", uuidv4(), {greeting: "As-Salamu Aalikum, ٱلسَّلَامُ عَلَيْكُمْ‎", subject: save.title, body: save.body, email: save.email, telephone: save.telephone, hrefURL: save.hrefURL, image: selectedImage.name})
            }
        }

        alert('Updated!')

        setSave({vID:"", subMenu:"", title: "", body:"", email:"noreply@firstcleveland.org", telephone:"216-404-8635", hrefURL:"firstCleveland.org", start: "", end: "", allDay: false})
        setSelectedImage(null)
    }
   

    return <>
        <div className={`w-3/4 px-2 py-5 my-10 ml-auto mr-auto ${global.darkMode ? 'bg-gray-700 text-white': 'rounded shadow  bg-gray-200'}`}>
            <div className="flex flex-wrap">
                <div className="w-3/5 ml-auto mr-auto">
                    {global.loggedIn && <div className="flex justify-center py-4"><button className="px-4 py-2 font-semibold text-white bg-yellow-500 rounded shadow hover:bg-yellow-700" onClick={handleLogout}>Logout</button></div>}
                    {/* Header Menu */}
                    <div className="mx-2 my-2 flex flex-wrap justify-around">
                        <button key="yt" onClick={e => setSave({...save, subMenu: e.currentTarget.name})} className={TABS} name="YouTube">YouTube</button>
                        
                        <button key="ga" onClick={e => setSave({...save, subMenu: e.currentTarget.name})} className={TABS} name="Gallery">Gallery</button>
                        
                        <button key="cal" onClick={e => setSave({...save, subMenu: e.currentTarget.name})} className={TABS} name="Events">Upcoming Events</button>
                        
                        <button key="mp" onClick={e => setSave({...save, subMenu: e.currentTarget.name})} className={TABS} name="Posts">Posts</button>
                    </div>
                </div>
            </div>

            { global.loggedIn ? 
                save.subMenu === 'YouTube' ? 
                [<div className="flex justify-center py-4">
                    <div className="flex justify-between py-4">
                        <label className="px-2 font-semibold" htmlFor="youtube" >YouTube Video URL: </label>
                        <input className="border border-black" id="youtube" onChange={e => setSave({...save, vID: e.target.value})} />
                    </div>
                </div>,
                <div className="flex justify-center py-4">
                    <button className="px-4 py-2 font-semibold text-white bg-blue-500 rounded shadow hover:bg-blue-700" onClick={handleSaveButton}>Save!</button>
                </div> ]
                : save.subMenu === 'Gallery' ? 
                [<div className="flex justify-center py-4">
                    <label className="px-2 font-semibold" htmlFor="youtube" >Add images to gallery: </label>
                    <input type="file" name="image" onChange={(event) => setSelectedImage(event.target.files[0])}/>
                        
                    {selectedImage && (<div>
                        <img alt="not found" src={URL.createObjectURL(selectedImage)} />
                        <br />
                        <button className="px-4 py-2 font-semibold text-white bg-red-500 rounded shadow hover:bg-red-700" onClick={()=>setSelectedImage(null)}>Remove</button>
                    </div>
                    )}
                </div>,
                <div className="flex justify-center py-4">
                    <button className="px-4 py-2 font-semibold text-white bg-blue-500 rounded shadow hover:bg-blue-700" onClick={handleSaveButton}>Update!</button>
                </div> ]
                : save.subMenu === 'Events' ?  
                    [<div className="flex justify-center py-4">
                        <label className="px-2 font-semibold" htmlFor="title" >Title: </label>
                        <input className="border border-black" id="title" type="text" size="20" onChange={e => setSave({...save, title: e.target.value})} ></input>
                    </div>,
                    <div className="flex justify-center py-4">
                        <label className="px-2 font-semibold" htmlFor="start" >Start Date: </label>
                        <input className="border border-black" id="start" type="datetime-local" onChange={e => setSave({...save, start: e.target.value})} ></input>
                    </div>,
                    <div className="flex justify-center py-4">
                        <label className="px-2 font-semibold" htmlFor="end" >End Date: </label>
                        <input className="border border-black" id="end" type="datetime-local" onChange={e => setSave({...save, end: e.target.value})} ></input>
                    </div>,
                    <div className="flex justify-center py-4">
                        <label className="px-2 font-semibold" htmlFor="start" >All Day Event? </label>
                        <select onChange={e => handleAllDayEvent(e)} >
                            <option>No</option>
                            <option>Yes</option>
                        </select>
                    </div>,
                    <div className="flex justify-center py-4">
                        <button className="px-4 py-2 font-semibold text-white bg-blue-500 rounded shadow hover:bg-blue-700" onClick={handleSaveButton}>Save!</button>
                    </div> 
                
                    ]
                
                : save.subMenu === 'Posts' ?  [
                    <div className="flex justify-between py-4">
                        <div>
                            <label className="px-2 font-semibold" htmlFor="title" >Title: </label>
                            <input className="border border-black" id="title" type="text" size="20" onChange={e => setSave({...save, title: e.target.value})} ></input>
                        </div>
                        <label className="px-2 font-semibold" htmlFor="body" >Body: </label>
                        <textarea className="border border-black" id="body" type="text" cols="30" rows="5" onChange={e => setSave({...save, body: e.target.value})} />
                        
                    </div>,
                    <div className="flex justify-between py-4">
                        <label className="px-2 font-semibold" htmlFor="email" >Email: </label>
                        <input className="border border-black" id="email" type="email" onChange={e => setSave({...save, email: e.target.value})} />

                        <label className="px-2 font-semibold" htmlFor="tel" >Telephone: </label>
                        <input className="border border-black" id="tel" type="tel" onChange={e => setSave({...save, telephone: e.target.value})} />
                    </div>,
                   
                    <div className="flex justify-between py-4">
                        <label className="px-2 font-semibold" htmlFor="image" >Image: </label>
                        <input type="file" name="image" onChange={(event) => setSelectedImage(event.target.files[0])}
                        />
                        
                        {selectedImage && (<div>
                            <img alt="not found" src={URL.createObjectURL(selectedImage)} />
                            <br />
                            <button className="px-4 py-2 font-semibold text-white bg-red-500 rounded shadow hover:bg-red-700" onClick={()=>setSelectedImage(null)}>Remove</button>
                        </div>
                        )}
                    </div>,
                    <div className="flex justify-center py-4">
                        <label className="px-2 font-semibold" htmlFor="url" >Website Address: </label>
                        <input className="border border-black" id="url" type="url" onChange={e => setSave({...save, hrefURL: e.target.value})} />
                    </div>,
                  
                    <div className="flex justify-center py-4">
                        <button className="px-4 py-2 font-semibold text-white bg-blue-500 rounded shadow hover:bg-blue-700" onClick={handleSaveButton}>Save!</button>
                    </div>          
                    ]
                
                
                : <div className="flex justify-center py-4"><p>Select of the options above to edit thy page.</p></div> 
            : 
               [ <div className="flex justify-center py-4"><p>You Must Be Logged In To Access This Page!</p></div>,
                 <div className="flex justify-center py-4"><button className="px-4 py-2 font-semibold text-white bg-yellow-500 rounded shadow hover:bg-yellow-700" onClick={handleLogin}>Log on</button></div>]
            
            }

                          
            </div>
    </>
}

export default Edit