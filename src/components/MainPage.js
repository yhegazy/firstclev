import {NavLink} from 'react-router-dom'
import { vID } from './hooks/Firebase';

export default function MainPage() { 
   
    return <>
    <div className="w-1/2 ml-auto mr-auto text-center">
        <img src={process.env.PUBLIC_URL + `/fcmLogo.png`} alt="Welcome"/>
        <p  className="pb-2 text-lg">
            The mission of the First Cleveland Mosque is to embrace and propagate the fundamental teachings of Islam through service to our community according to the Quran and the Sunnah of Prophet Muhammad (ﷺ)</p>
        <div className="p-1 space-x-3">
            <NavLink to={{pathname:"https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=4LH7ELGSGAKYU&source=url"}} target="_blank"><button className="p-2 text-white bg-green-500 rounded shadow">Donate to First Cleveland</button></NavLink>

            {vID.map((video) => <a href={`https://youtube.com/watch?v=${video.id}`}  rel="noreferrer" target="_blank"><button color="primary" className="p-2 text-white bg-indigo-500 rounded shadow" target="_blank">Watch Latest Live Stream (Fridays 1:30p ET)</button> </a> )}
        </div>
    </div>        

    </>
}