import { useState} from 'react'

import {annoucements} from './Annoucement'
import useFetch from './hooks/useFetch';

import { PopupboxManager, PopupboxContainer } from 'react-popupbox';
import "react-popupbox/dist/react-popupbox.css"


function AnnoucementPage(props) {
    const {global} = props
    // const {post} = useFetch("https://firebasestorage.googleapis.com/v0/b/sandbox-ca2f2.appspot.com/o/video.json?alt=media&token=0ab664b9-0e7a-442f-9bb4-ee194b5ff8eb")
    
    const [subMenu, setSubMenu] = useState(null)

   
    const handleCardClick = (e) => {
        console.log(e)
        const content = ([
            <div className="flex flex-wrap justify-center my-5 ml-auto mr-auto" >
                <p className="px-1 text-2xl" id={e.id} >{e.greeting}</p>
            </div>,
            
            <div className="pt-3 space-y-2"> 
                <p className="px-1 text-base">{e.body}</p>
                <a href={e.hrefURL} target="_blank" rel="noreferrer"><p className="px-1 text-base text-blue-700">{e.hrefURL}</p></a>
                <p className="px-1 text-base"><a href={`mailto:${e.hrefURL}`}>{e.email}</a></p>
                <p className="px-1 text-base">{e.telephone}</p>
                <p className="px-1 text-sm">{e.tag}</p>
            </div>,
                   
            // </div>,
            <div className="w-1/2">
            { e.image && <img className="flex bg-green-400 justify-evenly"  src={process.env.PUBLIC_URL + `/images/${e.image}`}  alt={e.tag} />}
             </div>
            
        ])
        PopupboxManager.open({ content })
    }
    // need to have title, subject, id, body, email, telephone, postedBy, tag, image, greeting, 
    // Need to create a quality looking annoucement's page. Requires drill downs (in form of popups)
    //Give Zakiyah the ability to edit the annoucement's page using a pre-determined user/password. Securish!

return <>
    <div className={`w-3/4 ml-auto mr-auto text-2xl p-5 space-y-2 ${global.darkMode && 'bg-gray-700 text-white'}`}>
        <h1 className="flex justify-center w-1/2 ml-auto mr-auto text-3xl">Annoucements</h1>
        
        <div className="flex flex-wrap">
            <div className="w-3/5 ml-auto mr-auto">
                <div className="flex flex-wrap justify-around mx-2 my-2">
                    <button key="class" onClick={e => setSubMenu(e.currentTarget.name)} className='px-4 py-2 font-semibold border-t border-l border-r rounded-t shadow font-semiboldbg-white hover:bg-gray-200 hover:text-black' name="classes">Classes</button>
                    
                    <button key="event" onClick={e => setSubMenu(e.currentTarget.name)} className='px-4 py-2 font-semibold border-t border-l border-r rounded-t shadow hover:bg-gray-200 hover:text-black' name="events">Events</button>
                </div>
            </div>
        </div>

        <div className='flex w-11/12 ml-auto mr-auto space-x-2'>
            {annoucements.slice(0,4).map((item, id) => 
                <div className="flex justify-center w-1/3 space-x-2 rounded shadow" onClick={() => handleCardClick(item)}>
                    <div className="space-y-1" >

                        {!item.image ? null : <img src={process.env.PUBLIC_URL + `/images/${item.image}`}  alt={item.id} />}

                        <p className="px-1" id={id} name="Blue" >{item.subject}</p>
                        <p className="px-1 text-base">{item.body}</p>
                        <p className="px-1 text-sm">{item.tag}</p>
                    </div>
                </div>

            )} 
        </div>
        <div className='w-11/12 px-2 py-1 ml-auto mr-auto '>
            Older: 
            {annoucements.slice(5,annoucements.length).map((item, id) => 
            <p className="text-base">{id + 1} - {item.subject}: {item.body.slice(0, 100)}</p>
            )}
        </div>
    </div>

    <PopupboxContainer  />
    </>
}

export default AnnoucementPage
