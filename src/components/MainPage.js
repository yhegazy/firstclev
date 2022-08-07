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
        <div className="">
            <h1 className='p-5 text-center display-4 mbr-white mbr-bold align-center'>Welcome to The First Cleveland Mosque</h1>
            <h4  className="p-5 mbr-semibold mbr-white align-center">The mission of the First Cleveland Mosque is to embrace and propagate the fundamental teachings of Islam through service to our community according to the Quran and the Sunnah of Prophet Muhammad (s.a.w.) -Salla Allahu Alaihi Wa Sallam</h4>
            <div className="w-1/2 ml-auto mr-auto">
                <NavLink activeClassName='active' to={{pathname:"https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=4LH7ELGSGAKYU&source=url"}} target="_blank"><button className="p-2 text-white bg-green-500 rounded shadow">Donate to First Cleveland</button></NavLink>
            </div>
            <div className="w-1/2 ml-auto mr-auto">
                {data && data.map((video) => <a href={`https://youtube.com/watch?v=${video.id}`} ><button color="primary" className="p-2 text-white bg-indigo-500 rounded shadow" target="_blank">Watch Latest Live Stream (Fridays 1:30p ET)</button> </a> )}
            </div>
        </div>        

    </>
}