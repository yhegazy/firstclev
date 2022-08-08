import React, {useState, useEffect} from 'react'
import {NavLink} from 'react-router-dom'
import useFetch from './hooks/useFetch';

export default function MainPage(props) { 
    const {get} = useFetch("https://firebasestorage.googleapis.com/v0/b/sandbox-ca2f2.appspot.com/o/video.json?alt=media&token=0ab664b9-0e7a-442f-9bb4-ee194b5ff8eb")
    const [data, setData] = useState()
    
    useEffect(() => {
        try{
            get("video.json").then(data => {setData(data)})
        }
        catch (error) {
            console.log(error)
        }  
    },[])

        return <>
        <div className="w-1/2 ml-auto mr-auto text-center">
            <img src={process.env.PUBLIC_URL + `/fcmLogo.png`} alt="Welcome"/>
            <p  className="pb-2 text-lg">
                The mission of the First Cleveland Mosque is to embrace and propagate the fundamental teachings of Islam through service to our community according to the Quran and the Sunnah of Prophet Muhammad (ﷺ)</p>
            <div className="p-1 space-x-3">
                <NavLink to={{pathname:"https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=4LH7ELGSGAKYU&source=url"}} target="_blank"><button className="p-2 text-white bg-green-500 rounded shadow">Donate to First Cleveland</button></NavLink>

                {data && data.map((video) => <a href={`https://youtube.com/watch?v=${video.id}`}  rel="noreferrer" target="_blank"><button color="primary" className="p-2 text-white bg-indigo-500 rounded shadow" target="_blank">Watch Latest Live Stream (Fridays 1:30p ET)</button> </a> )}
            </div>
        </div>        

    </>
}