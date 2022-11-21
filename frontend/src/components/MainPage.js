import { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom'
import { db } from '../appwrite/appwriteConfig';

import { Coordinates, CalculationMethod, PrayerTimes, Madhab } from 'adhan';
import Moment from 'react-moment'
import 'moment-timezone'

export default function MainPage(props) { 
    const {global} = props
    const navigate = useNavigate();
    const [data, setData] = useState({ytLinks: "", events: [], gallery: []})
    const [isLoading, setIsLoading] = useState(false)

    useEffect(async() => {
        setIsLoading(true)
        const video = await db.getDocument("637278aa811fb8962b16", "637281a5a4ef8b18ff46", "637281cdc2f22d321e13")
        const events = await db.listDocuments("637278aa811fb8962b16", "63727c039087bffba695")
        
        setData({...data, ytLinks: video.vID, events: events.documents.map((item) => item)})
        
        setIsLoading(false)
      
    },[])

    const handleClickMoreButton = () => navigate("/events")

    const [nextPrayer, setNextPrayer] = useState()
    useEffect(() => {
        let date = new Date();
        let coordinates = new Coordinates(41.4932, -81.4609);
        let params = CalculationMethod.NorthAmerica();
        params.madhab = Madhab.Shafi;
    
        let prayerTimes = new PrayerTimes(coordinates, date, params);
        let next = prayerTimes.nextPrayer()
        setNextPrayer(prayerTimes.timeForPrayer(next))
    },[])   


    return <>
        <div className="h-full flex flex-wrap" style={{ backgroundImage: `url(${global.image})`, backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed', backgroundSize: 'cover'}}>
            <div className="my-10 w-2/3 px-2 text-center">
                <p  className="p-3 text-2xl bg-gray-200 italic font-semibold shadow-md rounded-2xl">
                    The mission of the First Cleveland Mosque is to embrace and propagate the fundamental teachings of Islam through service to our community according to the Quran and the Sunnah of Prophet Muhammad (ﷺ)
                </p>
            </div>   
            <div className="my-3 w-1/3 ml-auto mr-auto">
                <div className="bg-gray-200 w-2/3 ml-auto mr-auto rounded text-center">
                    <p className="p-2 text-lg underline">Upcoming Events</p>
                    {isLoading ? <p>Loading...</p> : <ul>
                        {data && data.events
                                .slice(0, 20)
                                .reverse()
                                .map((item) => [
                                    <li className='flex justify-around px-2 bg-white'>{item.title} - {new Date(item.start).toLocaleDateString()}</li>,<hr/>
                                ])
                        }</ul>
                    }
                    <button className={`bg-transparent text-blue-700 font-semibold py-2 px-4 rounded ${global.darkMode ? 'hover:text-white': 'hover:text-black'}`} onClick={handleClickMoreButton} > Click for more...</button>
                </div>
            </div>  
            <div className="p-1 space-x-3 ml-auto mr-auto">
                    <a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=4LH7ELGSGAKYU&source=url" target="_blank" rel="noreferrer"><button className="p-2 text-white bg-green-500 rounded shadow">Donate to First Cleveland</button></a>

                    <a href={data.ytLinks}  rel="noreferrer" target="_blank"><button color="primary" className="p-2 text-white bg-indigo-500 rounded shadow">Watch Latest Live Stream (Fridays 1:30p ET)</button> </a>

                    <button className="p-2 my-5 text-white bg-yellow-500 rounded shadow">
                        <span>Next Prayer: </span>
                        <Moment tz="America/New_York" format="h:mm A">{nextPrayer}</Moment> 
                    </button>
                </div>

        </div>
    </>
}